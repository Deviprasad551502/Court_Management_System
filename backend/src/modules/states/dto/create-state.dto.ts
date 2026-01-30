import { IsInt, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateStateDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  state_key: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  display_name: string;
}
