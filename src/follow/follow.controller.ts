import { Body, Controller, Param, Post, Get, Delete, Put, Patch, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('follow')
export class FollowController {
      constructor(private readonly FollowService: FollowService){}

      @ApiOperation({summary:'Adiciona um Id do seguidor, associando ao usuario logado'})
      @Post("add")
      async saveFoll(@Body() body: {user_id:number, foll_id:number, follow:number}){
            return this.FollowService.saveFollow(body.user_id, body.foll_id, body.follow);
      }

      @ApiOperation({summary:'Retorna pelo Id do usuario todos que ele esta seguindo'})
      @Get(":userId")
      async getFollow(@Param('userId') userId: number){
            return this.FollowService.getFollow(userId);
      }

      @ApiOperation({summary:'Verifica se usuario A segue usuario B, retorna 0 ou 1 no atributo -seguindo-'})
      @Get("checkfoll/:userId/:follId")
      async checkIsFoll(
            @Param('userId') userId: number,
            @Param('follId') follId : number 
      ){
            return this.FollowService.CheckIsFoll(userId,follId);
      }

      @ApiOperation({summary:'Retorna pelo id do usuario, todos que ele segue, retornando a skins de cada um tambem e caso esteja compartilhada = 1'})
      @Get("getskins/:userId/:follId")
      async getFollowImg(
            @Param('userId') userId: number,
            @Param('follId') follId: number
      ){
            return this.FollowService.getFollowImg(userId,follId);
      }

      @ApiOperation({summary:'Aplica 0 em follow e para de seguir no front'})
      @Patch("updatefollow/:uid/:fid/:ord")
      async UnFollow(
            @Param('uid') uid:number,
            @Param('fid') fid:number,
            @Param('ord') ord:number
      ){
            return this.FollowService.Unfollow(uid,fid,ord);
      }

      @ApiOperation({summary:'Retorna os usuarios que estao seguindo determinado Usuario por ID'})
      @Get('/getfollowers/:id')
      async GetFollowers(@Param('id') id:number){
            return this.FollowService.GetFollowers(id);
      }

}