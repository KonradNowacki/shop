import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AdminProductModel} from "./admin-product.model";

export class AdminProductsSelectors {
  private static readonly adminProductsFeatureSelector = createFeatureSelector<AdminProductModel[]>('adminProducts');
  static readonly adminProducts = createSelector(
    AdminProductsSelectors.adminProductsFeatureSelector,
    (state: AdminProductModel[]) => state
  );
}


