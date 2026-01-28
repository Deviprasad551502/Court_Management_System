import { IsString, Length } from 'class-validator';

export class CreateCourtTypeDto {
  @IsString()
  @Length(3, 100)
  name: string;
}
