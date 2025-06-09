import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { userDtoRegister } from './dto/auth.dto.register';
import { userDtoLogin } from './dto/auth.dto.login';
import { Response } from 'express';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiOperation({summary:'Cadastra um usuario no BD'})
  @ApiResponse({status: 200, description:'Sucesso'})
  @ApiBody({type: CreateUserDto})
  @Post('register')
  async register(@Body() dto: userDtoRegister) {
    return await this.authService.register(dto);        
  }

  @ApiOperation({summary:'Envia token para email'})
  @ApiResponse({status: 200, description:'Sucesso'})
  @Post('verify-login')
  async verify(@Body('email') email: string) {
    return await this.authService.verifyLogin(email);        
  }
  
  @ApiOperation({summary:'Responsavel por fazer o login'})
  @Post('login')
  async login(
    @Body() dto: userDtoLogin,
    @Res({ passthrough: true }) res: Response
  ) {
    return await this.authService.login(dto, res);
  }
}
