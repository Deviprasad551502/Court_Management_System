import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtLocationMapDto } from './create-court-location-map.dto';

export class UpdateCourtLocationMapDto extends PartialType(
  CreateCourtLocationMapDto,
) {}
