import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailToken } from './email-token.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailTokenService {
  constructor(
    @InjectRepository(EmailToken)
    private tokenRepo: Repository<EmailToken>,
  ) {}

  async generateToken(email: string): Promise<void> {
    const token = Math.floor(100000 + Math.random() * 900000).toString(); // Ex: 6 dígitos
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // expira em 15 minutos

    const tokenEntry = this.tokenRepo.create({ email, token, expiresAt });
    await this.tokenRepo.save(tokenEntry);

    // ENVIA E-MAIL
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'SEU_EMAIL@gmail.com',
        pass: 'SENHA_APP', // Use App Passwords se estiver usando Gmail
      },
    });

    await transporter.sendMail({
      from: 'no-reply@seusite.com',
      to: email,
      subject: 'Seu código de verificação',
      text: `Seu código de verificação é: ${token}`,
    });
  }

  async validateToken(email: string, token: string): Promise<boolean> {
    const entry = await this.tokenRepo.findOne({ where: { email, token } });

    if (!entry) return false;
    if (entry.expiresAt < new Date()) return false;

    // Token válido, pode deletar se quiser
    await this.tokenRepo.delete({ id: entry.id });
    return true;
  }
}
