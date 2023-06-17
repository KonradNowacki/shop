import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminProductsActions } from './admin-products.actions';
import { AdminProductModel } from './admin-product.model';
import { Observable } from 'rxjs';
import { AdminProductsSelectors } from './admin-products.selectors';

@Injectable()
export class AdminProductsFacade {
  private readonly store = inject(Store);

  createProduct(product: AdminProductModel): void {
    this.store.dispatch(AdminProductsActions.createProduct({ product }));
  }

  setProducts(products: AdminProductModel[]): void {
    this.store.dispatch(AdminProductsActions.setProducts({ products }));
  }

  getProducts(): Observable<AdminProductModel[]> {
    return this.store.select(AdminProductsSelectors.adminProducts);
  }

  removeProduct(id: number): void {
    this.store.dispatch(AdminProductsActions.removeProduct({ id }));
  }
}
