import { Test, TestingModule } from '@nestjs/testing';
import { CourtTypesService } from './court-types.service';

describe('CourtTypesService', () => {
  let service: CourtTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourtTypesService],
    }).compile();

    service = module.get<CourtTypesService>(CourtTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
