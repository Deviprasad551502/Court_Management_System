import { IsString, IsInt, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  court_location_id: string;

  @IsInt()
  @IsNotEmpty()
  state_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  street_address_1: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  street_address_2?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;
}
