import { Body,Req, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';


UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
      constructor(private readonly UserService: UsersService){}

      @Get('me')
      getProfile(@Req() req) {
      return req.user; // ← vem do payload JWT
      }
      @ApiOperation({summary:'Retorna informações do usuario pelo ID'})
      @Get('/infor/:id')
      findOne(@Param('id') id:number){
            return this.UserService.FindIdName(id);
      }
      @ApiOperation({summary:'Retorna todos os usuarios cadastrados'})
      @Get("/all/:idUser")
      findAll(@Param("idUser") idUser:number){
            return this.UserService.findAll(idUser);
      }

      @ApiOperation({summary:'Retorna o usuario pelo Nickname'})
      @Get("/nick/:nick")
      findNick(@Param('nick') nick: string){
            return this.UserService.findNickname(nick);
      }
      
      
      @ApiOperation({summary:'Retorna os usuarios especificos pelo type(Ex 1 e 2)'})
      @Get('/type/:type')
      findByType(@Param('type') type: number){
            return this.UserService.findByType(type);
      }

      // @ApiOperation({summary:"Altera a propriedade online de 0 para 1 ou vice-versa"})
      // @Put('/atualiza/:uid')
      // async Atualiza(
      //       @Param('uid') uid: number,
      //       @Body() 
      //       body:{
      //             online: number
      //       }
      // ){
               //função atualizaStatus inapropriada
      //       return await this.UserService.atualizarStatus(body.online,uid);
      // }

}