import {Base64Image, ProductCategory} from '@shop/common-utils';

// TODO KN Add validation
export class AdminProductDetailsDto {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly category: ProductCategory;
}
