import { Controller, Post, Body, Res, Get, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { userDtoRegister } from './dto/auth.dto.register';
import { userDtoLogin } from './dto/auth.dto.login';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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

  @ApiOperation({summary:'Responsavel por pegar as informações do usuario no Token'})
  @Get('verify')
  @UseGuards(AuthGuard('jwt'))
  verifyToken(@Req() req) {
  const user = req.user;
  return { valid: true, user };
  }

  @ApiOperation({summary:'Responsavel por fazer o logout, limpando o cookie'})
  @Post('logout')
  logout(@Res() res: Response) {
    this.authService.logout(res);
    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  }

  // @ApiOperation({
  //   summary:
  //     'Função especifica do esqueci-senha, faz a verificação do Token e dar um PUT, atualizando a senha do usuario',
  // })
  // @Patch('forgot-password')  
  // async ForgotPass(@Body() body:{email:string, token:string, password:string}){
  //   return await this.authService
  // }

}
