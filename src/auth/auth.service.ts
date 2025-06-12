import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { userDtoLogin } from './dto/auth.dto.login';
import { userDtoRegister } from './dto/auth.dto.register';
import { EmailTokenService } from 'src/email-token/email-token.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailToken: EmailTokenService
  ) {}
  
  async verifyLogin(email:string):Promise<any>{
    return await this.emailToken.generateToken(email);
  }

  async register(userDto: userDtoRegister): Promise<any> {
    const userExists = await this.usersService.findUserByEmail(userDto.email);
    const nickExists = await this.usersService.findNickname(userDto.nickname);
    
    if (userExists == null && nickExists == null ) {
      const createdUser = await this.usersService.createUser(userDto);
      await this.emailToken.generateToken(userDto.email);
      return { message: 'Token de confirmação enviado para o email', user: createdUser };  
    }else if(nickExists){
      throw new UnauthorizedException('Nickname ja cadastrado! tente outro.')
    }else{
      throw new UnauthorizedException('Email ja cadastrado, tente fazer login')
    }

  }

  async login(dto: userDtoLogin, res: Response): Promise<{ nickname: string}> {
    const user = await this.usersService.findNickname(dto.nickname);
    if (user?.verificado == false){
      throw new UnauthorizedException('Usuario com email não verificado.');
    }
    if (!user) {
      throw new UnauthorizedException('Nickname não encontrado');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { 
      sub: user.id, 
      name: user.name,
      nickname:user.nickname,
      online:user.online,
      type:user.type,
      avatar:user.avatar       
    };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });
    return {
      nickname: user.nickname
    };
  }
  
  logout(res: Response): void {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/', 
  });
  }

  // async ForgotPassword(email:string, token:string, newPassword:string){

  // }

}


