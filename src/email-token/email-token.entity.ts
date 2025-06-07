import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('email_tokens')
export class EmailToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  token: string;

  @CreateDateColumn()
  createdat: Date;

  @Column({ type: 'timestamp' })
  expiresat: Date;
}
