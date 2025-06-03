    import {
      Body,
      Controller,
      Delete,
      Get,
      Param,
      Patch,
      Post,
      UploadedFile,
      UseGuards,
      UseInterceptors
    } from '@nestjs/common';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { storage } from './firebase'; // Supondo que você exportou storage aqui
    import * as multer from 'multer';
    import { v4 as uuid } from 'uuid';
    import * as path from 'path';
import { SkinsService } from './skins.service';
import { ApiOperation } from '@nestjs/swagger';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

    @UseGuards(JwtAuthGuard)
    @Controller('skin')
    export class SkinController {
      constructor(
        private readonly Skins: SkinsService,
        private readonly notificationGateway: NotificationsGateway
      ){}
      
      @ApiOperation({summary:'adiciona no bd a url das skins'})
      @Post('add')
      async addSkin(
        @Body() 
        body: {
          userId: number, url: string, comp: number
        }
      ){
        return this.Skins.saveImage(body.userId,body.url,body.comp);
      }
      @ApiOperation({summary:"Busca todas as skins do ID informado"})
      @Get('get/:id')
      async GetSkin(@Param('id') id:number ){
        return this.Skins.getImage(id)
      }
      @ApiOperation({summary:"Apaga a skin com base no Id + a url, para certificar"})
      @Delete('del/:id/')
      async DelSkin(@Param('id') id:number){
        return this.Skins.delImage(id);
      }

      @ApiOperation({summary:"Atualiza a skin pelo ID"})
      @Patch('update/:id')
      async update(
        @Param('id') id : number,
        @Body()
        Body:{
          url : string,
          comp : number
        }
      ){
        return this.Skins.update(id, Body.url, Body.comp);
      }

      @Post('upload')
      @UseInterceptors(FileInterceptor('file', {
        storage: multer.memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 },
      }))
      async uploadSkin(@UploadedFile() file: Express.Multer.File) {
        const bucket = storage.bucket();
        const filename = `${uuid()}${path.extname(file.originalname)}`;
        const filePath = `skins/${filename}`;
        const blob = bucket.file(filePath);
    
        const stream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
          resumable: false,
        });
    
        return new Promise((resolve, reject) => {
          stream.on('error', (err) => reject(err));
          stream.on('finish', async () => {
            await blob.makePublic(); // torna o arquivo público
    
            // ✅ Formata URL no padrão Firebase com alt=media e caminho codificado
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`;
    
            resolve({ url: publicUrl });
          });
    
          stream.end(file.buffer);
        });
      }
    }
    