import { createActionGroup, props } from '@ngrx/store';
import { AdminProductModel } from './admin-product.model';

export const AdminProductsActions = createActionGroup({
  source: 'ADMIN PRODUCT',
  events: {
    createProduct: props<{ product: AdminProductModel }>(),
    setProducts: props<{ products: AdminProductModel[] }>(),
  },
});
