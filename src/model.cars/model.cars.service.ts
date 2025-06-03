import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { modelCars } from './model.cars.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelCarsService {
      constructor(
            @InjectRepository(modelCars)
            private readonly modelCarsRepository:Repository<modelCars>
      ){}

      async getModelCars(){
            return await this.modelCarsRepository.manager.query(
                  `SELECT categoria, modelo, capa_url, blueprint_url, webgl_url from cars`
            )
      }
}