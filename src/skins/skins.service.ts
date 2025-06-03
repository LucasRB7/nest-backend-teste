import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { skins } from './skins.entity';
import { UsersService } from 'src/users/users.service';
import axios from 'axios';

@Injectable()
export class SkinsService {
      constructor(
            @InjectRepository(skins)
            private readonly skinsRepository: Repository<skins>,
            private readonly userService: UsersService,
      ){}
      async saveImage(userId: number, url: string, comp: number): Promise<skins>{
            const skin = new skins();
            skin.user_id = userId;
            skin.img_url = url;
            skin.compartilhado = comp;
            skin.up_date = new Date().toString();           
            
            return this.skinsRepository.save(skin);
      }
      async getImage(userId: number){
            return this.skinsRepository.find({where:{user_id:userId}})
      }
      async delImage(skinId:number){
            return this.skinsRepository
            .createQueryBuilder()
            .delete()
            .from(skins)
            .where("id = :id",{id : skinId})
            .execute();
      }
      async update(skinId:number, url:string, comp:number, userId:number){
            const resolve = await this.skinsRepository
            .createQueryBuilder()
            .update(skins)
            .set({
                  img_url:url,
                  up_date: new Date().toString(),
                  compartilhado: comp,
                  user_id: userId
            })
            .where("id = :id", {id : skinId})
            .execute()

            if(comp ==1){
              try {
            const user = await this.userService.FindIdName(userId)
            let msg = `${user?.nickname} acabou de lançar uma nova skin! Confere la!`;
            await axios.post(`http://localhost:3000/notifications/${userId}/${msg}`)       
            } catch (error) {
                  console.log(error)
            }

            }
            return resolve;
      }

}