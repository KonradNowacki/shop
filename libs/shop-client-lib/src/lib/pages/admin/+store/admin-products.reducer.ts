import { AdminProductModel } from './admin-product.model';
import { createReducer, on } from '@ngrx/store';
import { AdminProductsActions } from './admin-products.actions';

const adminProductsInitialState: AdminProductModel[] = [];

export const adminProductsReducer = createReducer(
  adminProductsInitialState,
  on(AdminProductsActions.setProducts, (state, { products }) => products)
);
