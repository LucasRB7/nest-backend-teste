import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()  // Define que é uma tabela no banco
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  dt_nasc: string;

  @Column()
  password: string;

  @Column()
  type: number;

  @Column()
  avatar: string;

  @Column()
  estado: string;

  @Column()
  online: number;

  @Column()
  genero: string;

  @Column()
  verificado: boolean;
}
