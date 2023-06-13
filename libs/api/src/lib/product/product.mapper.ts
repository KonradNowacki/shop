import { Product } from './product.entity';
import { AdminProductDetailsDto, AdminProductDto } from '@shop/common-api';
import { ProductCategory } from '@shop/common-utils';

export class ProductMapper {
  static entityToAdminProductDto({
    id,
    name,
    price,
    category,
  }: Product): AdminProductDto {
    return { id, name, price, category: category as ProductCategory };
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
