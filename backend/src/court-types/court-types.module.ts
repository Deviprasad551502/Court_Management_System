import { Module } from '@nestjs/common';
import { CourtTypesController } from './court-types.controller';
import { CourtTypesService } from './court-types.service';

@Module({
  controllers: [CourtTypesController],
  providers: [CourtTypesService],
})
export class CourtTypesModule {}
