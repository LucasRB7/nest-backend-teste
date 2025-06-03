import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { userDtoRegister } from './dto/auth.dto.register';
import { userDtoLogin } from './dto/auth.dto.login';

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
    await this.authService.register(dto);
    
  }
  
  @ApiOperation({summary:'Responsavel por fazer o login'})
  @Post('login')
  async login(@Body() dto: userDtoLogin) {
    return this.authService.login(dto);
  }
}
