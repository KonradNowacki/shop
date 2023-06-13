import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminProductsActions } from './admin-products.actions';
import { AdminProductModel } from './admin-product.model';

@Injectable()
export class AdminProductsFacade {
  private readonly store = inject(Store);

  createProduct(product: AdminProductModel): void {
    this.store.dispatch(AdminProductsActions.createproduct({ product }));
  }
}
