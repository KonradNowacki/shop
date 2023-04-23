import {IsNumber, IsString, Min, MinLength} from "class-validator";

export class CreateProductDto {

  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsNumber({
    maxDecimalPlaces: 2
  })
  @Min(0)
  readonly price: number;
}
