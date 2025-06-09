// email-token.controller.ts
import { Controller, Post,Get, Body } from '@nestjs/common';
import { EmailTokenService } from './email-token.service';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@Controller('email-token')
export class EmailTokenController {
  constructor(
    private readonly tokenService: EmailTokenService,
    private readonly userService: UsersService
  ) {}

  @ApiOperation({
    summary:
      'Responsavel por verificar o token enviado por email. Token ja foi enviado pelo auth.register',
  })
  @Post('verify')
  async verify(@Body() body: { email: string; token: string }) {
    const isValid = await this.tokenService.validateToken(
      body.email,
      body.token,
    );
    if(isValid){
      await this.userService.atualizarStatusVerificado(body.email);
      return { success: true, message: 'Token confirmado.' }
    }else{
      return { success: false, message: 'Token inválido ou expirado.' };
    }     
      
  }
}
