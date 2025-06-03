import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  // Define que é uma tabela no banco
export class model_cars {
  @PrimaryGeneratedColumn()
  id_car: number;

  @Column()
  categoria: string;

  @Column()
  modelo: string;

  @Column()
  capa_url: string;

  @Column()
  blueprint_url: string;

  @Column()
  webgl_url: string;
}
