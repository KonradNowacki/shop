import { createActionGroup, props } from '@ngrx/store';
import { AdminProductModel } from './admin-product.model';

export const AdminProductsActions = createActionGroup({
  source: 'ADMIN PRODUCT',
  events: {
    createProduct: props<{ product: AdminProductModel }>(),
    updateProduct: props<{ product: AdminProductModel, productId: number }>(),
    removeProduct: props<{ id: number }>(),

    setProducts: props<{ products: AdminProductModel[] }>(),
    unsetProduct: props<{ id: number }>(),
    setProduct: props<{ product: AdminProductModel }>(),
  },
});
