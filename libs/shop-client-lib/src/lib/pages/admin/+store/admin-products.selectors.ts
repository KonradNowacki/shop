import {createFeatureSelector, createSelector} from "@ngrx/store";
import { AdminProductsState} from "./admin-product.model";
import {adminProductsAdapter} from "./admin-products.entity";

const { selectAll } = adminProductsAdapter.getSelectors();

export class AdminProductsSelectors {

  private static readonly adminProductsFeatureSelector = createFeatureSelector<AdminProductsState>('adminProducts');

  static readonly adminProducts = createSelector(
    this.adminProductsFeatureSelector,
    selectAll
  );

}




