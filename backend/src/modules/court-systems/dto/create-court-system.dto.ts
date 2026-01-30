import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCourtSystemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  court_system_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  court_type_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  court_system_name: string;
}
