import { ProductCategory } from '@shop/common-utils';

export interface AdminProductModel {
  readonly id?: number;
  readonly name: string;
  readonly price: number;
  readonly category: ProductCategory;
  readonly image: File | null;
}
