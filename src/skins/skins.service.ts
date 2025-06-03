import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { skins } from './skins.entity';
import axios from 'axios';

@Injectable()
export class SkinsService {
      constructor(
            @InjectRepository(skins)
            private readonly skinsRepository: Repository<skins>
      ){}
      async saveImage(userId: number, url: string, comp: number): Promise<skins>{
            const skin = new skins();
            skin.user_id = userId;
            skin.img_url = url;
            skin.compartilhado = comp;
            skin.up_date = new Date().toString();
            try {
            const responseUser = await axios.get(`http://localhost:3000/users/infor/${userId}`)
            const userData = responseUser.data;
            await axios.post(`http://localhost:3000/notifications/${userId}/${userData.nickname} acabou de lançar uma nova skin! Confere la!`)

            } catch (error) {
                  console.log(error)
            }           
            
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
      async update(skinId:number, url:string, comp:number){
            return this.skinsRepository
            .createQueryBuilder()
            .update(skins)
            .set({
                  img_url:url,
                  up_date: new Date().toString(),
                  compartilhado: comp
            })
            .where("id = :id", {id : skinId})
            .execute()
      }

}