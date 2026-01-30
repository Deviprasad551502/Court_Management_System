import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtSystemDto } from './create-court-system.dto';

export class UpdateCourtSystemDto extends PartialType(CreateCourtSystemDto) {}
