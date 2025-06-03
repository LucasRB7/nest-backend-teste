import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { userDtoRegister } from 'src/auth/dto/auth.dto.register';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>, // O repositório de usuários, injetado pelo TypeORM
  ) {}
  async createUser(dto: userDtoRegister){
  
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Cria um novo usuário e salva no banco
    await this.usersRepository.manager.query(
      `INSERT INTO users (id, name, nickname, email, dt_nasc, password, type, avatar, estado, online)
       VALUES (DEFAULT, ?, ?, ?, ?, ?, 2, ?, ?, 0)`,[dto.name, dto.nickname, dto.email, dto.dt_nasc, hashedPassword, dto.avatar, dto.estado]
    );
     // Salva o usuário no banco de dados
  }

  async findNickname(nickname: string): Promise <Users | null> {
    const nick = await this.usersRepository.findOne({where: {nickname}})
    return nick;
  }
  async FindIdName(id: number){
    return await this.usersRepository.findOne({where:{id}})
  }

  async findUserByEmail(email: string): Promise<Users | null> {
      const user = await this.usersRepository.findOne({ where: { email } });
  
      if (!user) {
        return null; 
      }
  
      return user; 
    }

  async findAll(idUser:number){
    return await this.usersRepository.manager.query(
      `SELECT 
      u.id, u.name, u.nickname, u.dt_nasc, 
      u.type, u.avatar, u.estado, u.online 
      FROM users u WHERE u.id != ?`,[idUser]
    )
  }
  async findByType(type:number){
    return await this.usersRepository.find({ where: { type:type } });
    
  }
  async atualizarStatus(uid:number, online:number){
    return await this.usersRepository.createQueryBuilder()
    .update(Users)
    .set({online: online })
    .where("id = :id", { id: uid })
    .execute()
  }

  

}
