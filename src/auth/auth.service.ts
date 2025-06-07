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
  

  async register(userDto: userDtoRegister): Promise<any> {
    const userExists = await this.usersService.findUserByEmail(userDto.email);
    if (userExists) {
    return { message: 'Email já cadastrado'};
    }
    const createdUser = await this.usersService.createUser(userDto);
    await this.emailToken.generateToken(userDto.email);
    return { message: 'Token de confirmação enviado para o email', user: createdUser };
  }

  // LOGIN
  async login(dto: userDtoLogin, res: Response): Promise<{ access_token: string, type: number, id_user: number,nickname: string, online:number}> {
    const user = await this.usersService.findNickname(dto.nickname);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { sub: user.id, nickname:user.nickname };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // true em produção com HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    });
    return { 
      access_token: token,
      type: user.type,
      id_user: user.id,
      nickname: user.nickname,
      online:user.online
    };
  }
}


