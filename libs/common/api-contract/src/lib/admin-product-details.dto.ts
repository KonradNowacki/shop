import {Base64Image, ProductCategory} from '@shop/common-utils';

export class AdminProductDetailsDto {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly category: ProductCategory;
}
