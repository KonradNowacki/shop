import {AdminProductModel} from "./admin-product.model";
import {createReducer} from "@ngrx/store";

const adminProductsInitialState: AdminProductModel[] = [];

export const adminProductsReducer = createReducer(
  adminProductsInitialState
)
