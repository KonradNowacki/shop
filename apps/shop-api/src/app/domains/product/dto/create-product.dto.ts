import {IsNumber, IsString} from "class-validator";

export class CreateProductDto {

  @IsString()
  readonly name: string;

  @IsNumber({
    maxDecimalPlaces: 2
  })
  readonly price: number;
}
