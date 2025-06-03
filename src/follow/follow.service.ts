import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { follow } from './follow.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FollowService {
      constructor(
            @InjectRepository(follow)
            private readonly followRepository: Repository<follow>,

      ){}
      async saveFollow(user_id:number, foll_id:number, ffollow:number ):Promise <follow>{
            const foll = new follow();
            foll.user_id = user_id;
            foll.foll_id = foll_id;
            foll.follow = ffollow;
            foll.date = new Date().toString();

            return this.followRepository.save(foll);
      }

      async getFollow(userId: number){
            const result = await this.followRepository.manager.query(`
                  SELECT u.id, u.name,f.user_id, u.nickname, f.follow, u.avatar
                  FROM follow f
                  INNER JOIN users u ON u.id = f.foll_id
                  WHERE f.user_id = ? 
                `, [userId]); 
            
            return result;   
      }

      async CheckIsFoll(userId:number, follId:number){
            return await this.followRepository.manager.query(
                  `SELECT f.user_id, u.nickname, f.foll_id, f.follow
                  FROM follow f
                  INNER JOIN users u ON u.id = f.foll_id
                  WHERE f.user_id = ? AND f.foll_id = ?`,[userId,follId]
            )
      }

      async getFollowImg(userId: number, follId: number){
            return await this.followRepository.manager.query(
                  `select name, avatar, nickname, img_url,f.follow, s.compartilhado from follow f
                  join users u ON u.id = f.foll_id
                  join skins s ON s.user_id = u.id
                  where f.user_id = ? and f.foll_id = ? and f.follow = 1 and s.compartilhado = 1
                  ORDER BY s.up_date DESC`,[userId, follId]
            );
      }

      async DeleteFollow(regId: number){
            return await this.followRepository.createQueryBuilder()
            .delete()
            .from(follow)
            .where("id = :id", { id: regId })
            .execute()
      }

      async Unfollow( userId: number, follId:number, ord:number): Promise<any>{
            return await this.followRepository
            .createQueryBuilder()
            .update(follow)
            .set({follow:ord})
            .where("user_id = :id", { id: userId })
            .andWhere("foll_id = :idf", {idf: follId})
            .execute()
      }
            
      async GetFollowers(id:number){
            return await this.followRepository.manager.query(
                  `SELECT f.user_id, u.nickname, f.foll_id, f.follow
                  FROM follow f
                  INNER JOIN users u ON u.id = f.foll_id
                  WHERE f.foll_id = ?`,[id]
            )
      }


}
