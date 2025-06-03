import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { userDtoLogin } from './dto/auth.dto.login';
import { userDtoRegister } from './dto/auth.dto.register';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: userDtoRegister): Promise<any> {
    const userExists = await this.usersService.findUserByEmail(userDto.email);
    if (userExists) {
      throw new Error('Usuário já cadastrado');
    }
    const createdUser = await this.usersService.createUser(userDto);

    return { message: 'Usuário cadastrado com sucesso', user: createdUser };
  }

  // LOGIN
  async login(dto: userDtoLogin): Promise<{ access_token: string, type: number, id_user: number,nickname: string, online:number}> {
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

    return { 
      access_token: token,
      type: user.type,
      id_user: user.id,
      nickname: user.nickname,
      online:user.online
    };
  }
}


