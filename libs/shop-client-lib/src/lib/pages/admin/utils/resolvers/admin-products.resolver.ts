import { AdminProductModel } from '../../+store/admin-product.model';
import { AdminProductDto } from '@shop/common-api';
import {inject, Injectable} from '@angular/core';
import { ProductsApiService } from '../../../../api/products-api.service';
import {map, Observable, tap} from 'rxjs';
import { AdminProductsFacade } from '../../+store/admin-products.facade';

@Injectable()
export class AdminProductsResolver {

  private readonly productsApiService = inject(ProductsApiService);
  private readonly adminProductsFacade = inject(AdminProductsFacade);

  resolve(): Observable<AdminProductModel[]> {
    return this.productsApiService
      .getLoggedInUsersProducts()
      .pipe(
        map(mapper),
        tap(products => {
          this.adminProductsFacade.setProducts(products)
        })
      );
  }
}

// TODO KN Move to a different file
const mapper = (products: AdminProductDto[]): AdminProductModel[] => {
  return products.map((product) => {
    const { id, name, price, category } = product;
    return { id, name, price, category, image: null };
  });
};
