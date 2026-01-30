import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtSystemsService } from './court-systems.service';
import { CourtSystemsController } from './court-systems.controller';
import { CourtSystem } from 'src/entities/court-system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourtSystem])],
  controllers: [CourtSystemsController],
  providers: [CourtSystemsService],
  exports: [CourtSystemsService],
})
export class CourtSystemsModule {}
