import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailToken } from './email-token.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { Resend } from 'resend';

@Injectable()
export class EmailTokenService {
  constructor(
    @InjectRepository(EmailToken)
    private tokenRepo: Repository<EmailToken>,
  ) {}

  async generateToken(email: string): Promise<void> {
    const token = Math.floor(100000 + Math.random() * 900000).toString(); // Ex: 6 dígitos

    const tokenEntry = this.tokenRepo.create({ email, token });
    await this.tokenRepo.save(tokenEntry);

    const resend = new Resend(process.env.RESEND_API);
    await resend.emails.send({
      from: 'no-reply@dlrbtech.com',
      to: email,
      subject: 'Código de verificação - SebbyGames',
      text: `Seu código é: ${token}. Ele expira em 15 minutos.`
    });    
  }

  async validateToken(email: string, token: string): Promise<boolean> {
    const entry = await this.tokenRepo.manager.query(` 
      SELECT * FROM email_tokens WHERE email = $1 AND token = $2 
      `,[email, token])
    console.log(entry)
    if (!entry) return false;
    return true;
  }
}
