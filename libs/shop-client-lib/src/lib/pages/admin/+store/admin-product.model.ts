import {ProductCategory} from "@shop/common-utils";

export interface AdminProductModel {
  readonly name: string;
  readonly price: number;
  readonly category: ProductCategory
}
