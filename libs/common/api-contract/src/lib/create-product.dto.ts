import {IsEnum, IsNotEmpty, IsNumber, IsString, Min, MinLength} from "class-validator";
import {ProductCategory} from "@shop/common-utils";


export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2
  })
  @Min(0)
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(ProductCategory)
  readonly category: ProductCategory
}
