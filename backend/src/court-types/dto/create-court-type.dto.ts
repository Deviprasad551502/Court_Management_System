// src/court-types/dto/create-court-type.dto.ts

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourtTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
