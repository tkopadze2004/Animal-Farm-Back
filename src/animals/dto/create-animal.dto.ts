import { IsString, IsNumber } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsString()
  animalType: string;

  @IsString()
  foodType: string;

  @IsNumber()
  thanksCount: number;
}
