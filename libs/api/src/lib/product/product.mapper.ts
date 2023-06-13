import { Product } from './product.entity';
import { AdminProductDetailsDto, AdminProductDto } from '@shop/common-api';
import { ProductCategory } from '@shop/common-utils';
import * as fs from "fs";

export class ProductMapper {
  static entityToAdminProductDto({
    id,
    name,
    price,
    category,
    filename,
  }: Product): AdminProductDto {
    return {
      id,
      name,
      price,
      category: category as ProductCategory,
      image: "data:image/jpg;base64," + fs.readFileSync(`./uploads/${filename}`, 'base64') // TODO KN Move to other fn, handle errors
    };
  }

  static entityToAdminProductDetailsDto({
    id,
    name,
    price,
    category,
  }: Product): AdminProductDetailsDto {
    return { id, name, price, category: category as ProductCategory };
  }
}
