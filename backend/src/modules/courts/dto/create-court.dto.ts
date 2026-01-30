import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCourtDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  court_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  court_system_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
