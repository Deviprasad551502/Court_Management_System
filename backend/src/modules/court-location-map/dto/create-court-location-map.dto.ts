import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCourtLocationMapDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  court_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  court_location_id: string;
}
