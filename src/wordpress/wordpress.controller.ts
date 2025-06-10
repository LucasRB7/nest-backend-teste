// src/wordpress/wordpress.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Body, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WordpressService } from './wordpress.service';
import { Response } from 'express'; // Importe Response do 'express'

@Controller('wordpress') // Prefixo para todas as rotas neste controller
export class WordpressController {
  constructor(private readonly wordpressService: WordpressService) {}

  @Post('upload-img')
  @UseInterceptors(FileInterceptor('file')) // 'file' deve corresponder ao nome do campo no FormData do frontend
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string, // Opcional: pegue o título do corpo da requisição
    @Body('alt_text') alt_text: string, // Opcional: pegue o texto alternativo do corpo da requisição
    @Res() res: Response // Injetar o objeto de resposta para controle manual
  ) {
    try {
      const mediaItem = await this.wordpressService.uploadMedia(file, title, alt_text);
      return res.status(HttpStatus.CREATED).json({
        message: 'Avatar enviado com sucesso para o WordPress!',
        data: mediaItem,
      });
    } catch (error) {
      console.error('Erro no controller de upload:', error.message);
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Erro interno do servidor ao enviar avatar.',
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}