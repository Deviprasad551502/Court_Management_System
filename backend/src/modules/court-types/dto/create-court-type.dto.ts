import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCourtTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
