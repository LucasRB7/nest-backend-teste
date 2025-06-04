// email-token.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailTokenService } from './email-token.service';

@Controller('email-token')
export class EmailTokenController {
  constructor(private readonly tokenService: EmailTokenService) {}

  @Post('send')
  async send(@Body('email') email: string) {
    await this.tokenService.generateToken(email);
    return { message: 'Token enviado para o e-mail.' };
  }

  @Post('verify')
  async verify(@Body() body: { email: string; token: string }) {
    const isValid = await this.tokenService.validateToken(body.email, body.token);
    return isValid
      ? { success: true, message: 'Token confirmado.' }
      : { success: false, message: 'Token inválido ou expirado.' };
  }
}
