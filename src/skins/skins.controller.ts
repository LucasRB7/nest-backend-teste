    import {
      Body,
      Controller,
      Delete,
      Get,
      Param,
      Patch,
      Post,
      UseGuards,
    } from '@nestjs/common';
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
    }