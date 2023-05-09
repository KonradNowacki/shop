import {IsNotEmpty, IsNumber, IsString, Min, MinLength} from "class-validator";
import {ProductCategory} from "../../../../../shared-ts/src/lib/product-category.enum";

export class CreateProductDto {

  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsNumber({
    maxDecimalPlaces: 2
  })
  @Min(0)
  readonly price: number;

  @IsNotEmpty()
  readonly category: ProductCategory
}
