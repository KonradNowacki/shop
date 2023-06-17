import { ProductCategory } from '@shop/common-utils';
import {EntityState} from "@ngrx/entity";

export interface AdminProductModel {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly category: ProductCategory;
  readonly image: File | null;
}

export type AdminProductsState = EntityState<AdminProductModel>
