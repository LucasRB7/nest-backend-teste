import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { model_cars } from './model.cars.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelCarsService {
      constructor(
            @InjectRepository(model_cars)
            private readonly modelCarsRepository:Repository<model_cars>
      ){}

      async getModelCars(){
            return await this.modelCarsRepository.manager.query(
                  `SELECT categoria, modelo, capa_url, blueprint_url, webgl_url from model_cars`
            )
      }
}