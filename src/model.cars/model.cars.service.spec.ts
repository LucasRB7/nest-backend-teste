import { Test, TestingModule } from '@nestjs/testing';
import { ModelCarsService } from './model.cars.service';

describe('ModelCarsService', () => {
  let service: ModelCarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelCarsService],
    }).compile();

    service = module.get<ModelCarsService>(ModelCarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
