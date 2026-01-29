import { Test, TestingModule } from '@nestjs/testing';
import { CourtTypesController } from './court-types.controller';

describe('CourtTypesController', () => {
  let controller: CourtTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtTypesController],
    }).compile();

    controller = module.get<CourtTypesController>(CourtTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
