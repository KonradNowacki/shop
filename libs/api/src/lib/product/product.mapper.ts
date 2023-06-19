import { Product } from './product.entity';
import { AdminProductDetailsDto, AdminProductDto } from '@shop/common-api';
import {Base64Image, buildBase64Image, ProductCategory} from '@shop/common-utils';
import * as fs from "fs";

export class ProductMapper {
  static entityToAdminProductDto({
    id,
    name,
    price,
    category,
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
    filename
  }: Product): AdminProductDetailsDto {
    let imageBase64;
    if (filename) {
      const imgPath = `./uploads/${filename}`;
      const imageContent = fs.readFileSync(imgPath, { encoding: 'base64' });
      imageBase64 = buildBase64Image(imageContent);
    }
    return { id, name, price, imageBase64, category: category as ProductCategory };
  }
}
