import { Module } from '@nestjs/common';
import { ModelCarsService } from './model.cars.service';
import { ModelCarsController } from './model.cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { modelCars } from './model.cars.entity';


@Module({
  imports:[TypeOrmModule.forFeature([modelCars])],
  providers: [ModelCarsService],
  controllers: [ModelCarsController]
})
export class ModelCarsModule {}
