import { Controller, Get, UseGuards } from '@nestjs/common';
import { ModelCarsService } from './model.cars.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('modelcars')
export class ModelCarsController {
      constructor(private readonly modelCarService: ModelCarsService){}

      @ApiOperation({summary:'Retorna todos os modelos de carros sem filtro'})
            @Get('/get')
            async getModel(){
                  return this.modelCarService.getModelCars();
      
            }
}
