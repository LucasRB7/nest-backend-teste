import { Module } from '@nestjs/common';
import { ModelCarsService } from './model.cars.service';
import { ModelCarsController } from './model.cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { model_cars } from './model.cars.entity';


@Module({
  imports:[TypeOrmModule.forFeature([model_cars])],
  providers: [ModelCarsService],
  controllers: [ModelCarsController]
})
export class ModelCarsModule {}
