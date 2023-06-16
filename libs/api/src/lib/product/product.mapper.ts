import { Product } from './product.entity';
import { AdminProductDetailsDto, AdminProductDto } from '@shop/common-api';
import {Base64Image, buildBase64Image, ProductCategory} from '@shop/common-utils';

export class ProductMapper {
  static entityToAdminProductDto({
    id,
    name,
    price,
    category,
    filename
  }: Product): AdminProductDto {
    return {
      id,
      name,
      price,
      category: category as ProductCategory,
      // image
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
