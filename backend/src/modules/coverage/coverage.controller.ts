import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { CoverageService } from './coverage.service';

@Controller('coverage')
export class CoverageController {
  constructor(private readonly coverageService: CoverageService) {}

  // 0️⃣ Court Types (for Coverage UI)
  @Get('court-types')
  getCourtTypes() {
    return this.coverageService.getCourtTypes();
  }

  // 1️⃣ Court Types → States
  @Get('states')
  getStatesByCourtType(
    @Query('courtTypeId') courtTypeId: string
  ) {
    if (!courtTypeId) {
      throw new BadRequestException('courtTypeId is required');
    }
    return this.coverageService.getStatesByCourtType(courtTypeId);
  }

  // 1️⃣b All States (unfiltered)
  @Get(['states/all', 'states/getallstates'])
  getAllStates() {
    return this.coverageService.getAllStates();
  }

  // 2️⃣ CourtType + State → Court Systems → Courts → Locations
  @Get('data')
  getCoverageData(
    @Query('courtTypeId') courtTypeId: string,
    @Query('stateKey') stateKey: string,
  ) {
    if (!courtTypeId) {
      throw new BadRequestException('courtTypeId is required');
    }
    if (!stateKey) {
      throw new BadRequestException('stateKey is required');
    }
    return this.coverageService.getCoverageData(courtTypeId, stateKey);
  }

  // 2️⃣ State → Court Systems → Courts → Locations
  @Get('state-data')
  getStateData(
    @Query('stateKey') stateKey: string
  ) {
    if (!stateKey) {
      throw new BadRequestException('stateKey is required');
    }
    return this.coverageService.getFullStateHierarchy(stateKey);
  }
}
