// src/wordpress/wordpress.service.ts
import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data'; // Use form-data para enviar arquivos para APIs externas

@Injectable()
export class WordpressService {
  private readonly wordpressApiUrl: string = process.env.WORDPRESS_API_URL || 'https://seu-site-wordpress.com/wp-json'; // Substitua pela URL do seu WordPress
  private readonly wordpressUsername: string = process.env.WORDPRESS_API_USERNAME || 'SEU_USUARIO_API'; // Nome de usuário que gerou a Application Password
  private readonly wordpressApplicationPassword: string = process.env.WORDPRESS_APPLICATION_PASSWORD || 'SUA_APPLICATION_PASSWORD'; // A Application Password gerada

  constructor() {
    if (!this.wordpressApiUrl || !this.wordpressUsername || !this.wordpressApplicationPassword) {
      console.warn('Variáveis de ambiente do WordPress não configuradas. Verifique .env ou suas configurações.');
      // Opcional: throw new Error('Credenciais da API do WordPress não configuradas.');
    }
  }

  async uploadMedia(file: Express.Multer.File, title?: string, altText?: string): Promise<any> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    const authHeader = 'Basic ' + Buffer.from(`${this.wordpressUsername}:${this.wordpressApplicationPassword}`).toString('base64');
    
    // Usamos 'form-data' para construir o payload multipart/form-data corretamente para a API externa
    const formData = new FormData();
    formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
    });
    if (title) {
        formData.append('title', title);
    } else {
        formData.append('title', file.originalname.split('.')[0]); // Título padrão
    }
    if (altText) {
        formData.append('alt_text', altText);
    }

    try {
      const response = await axios.post(
        `${this.wordpressApiUrl}/wp/v2/media`,
        formData,
        {
          headers: {
            ...formData.getHeaders(), // Importante para definir o Content-Type correto com boundary
            'Authorization': authHeader,
          },
          maxBodyLength: Infinity, // Importante para uploads de arquivos grandes
          maxContentLength: Infinity, // Importante para downloads de arquivos grandes
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer upload para o WordPress:', error.response?.data || error.message);
      if (error.response?.data) {
        // Tenta retornar a mensagem de erro específica do WordPress
        throw new InternalServerErrorException(error.response.data.message || 'Erro ao fazer upload para o WordPress.');
      }
      throw new InternalServerErrorException('Erro desconhecido ao fazer upload para o WordPress.');
    }
  }
}