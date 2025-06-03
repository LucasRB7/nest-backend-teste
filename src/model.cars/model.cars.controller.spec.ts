import { Test, TestingModule } from '@nestjs/testing';
import { ModelCarsController } from './model.cars.controller';

describe('ModelCarsController', () => {
  let controller: ModelCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelCarsController],
    }).compile();

    controller = module.get<ModelCarsController>(ModelCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
