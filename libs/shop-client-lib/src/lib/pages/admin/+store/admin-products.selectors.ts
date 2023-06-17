import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AdminProductModel, AdminProductsState} from "./admin-product.model";
import {adminProductsAdapter} from "./admin-products.entity";

const { selectAll } = adminProductsAdapter.getSelectors();

const adminProductsFeatureSelector = createFeatureSelector<AdminProductsState>('adminProducts');

export const adminProducts = createSelector(
  adminProductsFeatureSelector,
  adminProductsAdapter.getSelectors().selectAll
);


