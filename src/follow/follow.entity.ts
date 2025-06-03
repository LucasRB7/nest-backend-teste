import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class follow{
      @PrimaryGeneratedColumn()
      id: number;

      @Column()
      user_id: number;

      @Column()
      foll_id: number;

      @Column()
      follow:number;

      @Column()
      date: string;
      
}