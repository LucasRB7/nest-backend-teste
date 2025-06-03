import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/users/user.entity';

@Entity()  // Define que é uma tabela no banco
export class skins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  img_url: string;

  @Column()
  up_date: string;

  @Column()
  compartilhado: number;

  @ManyToOne(()=> Users, (user)=> user.id)
  @JoinColumn({name: 'user_id'})
  user:Users;
}
