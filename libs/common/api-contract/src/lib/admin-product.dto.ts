import { ProductCategory } from '@shop/common-utils';

// TODO KN Add validation

export class AdminProductDto {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly category: ProductCategory;
  readonly image?: string;
}
