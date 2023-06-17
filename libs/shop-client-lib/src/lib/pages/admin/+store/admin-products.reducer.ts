import { createReducer, on } from '@ngrx/store';
import { AdminProductsActions } from './admin-products.actions';
import { adminProductsAdapter } from './admin-products.entity';
import {AdminProductsState} from "./admin-product.model";

export const initialState: AdminProductsState = adminProductsAdapter.getInitialState();

export const adminProductsReducer = createReducer(
  initialState,
  on(AdminProductsActions.setProducts, (state, { products }) => adminProductsAdapter.setMany(products, state)
  )
);
