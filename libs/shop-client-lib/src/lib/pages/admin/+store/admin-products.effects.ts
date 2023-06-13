import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, EMPTY, exhaustMap, tap } from 'rxjs';
import { AdminProductsActions } from './admin-products.actions';
import { ProductsApiService } from '../../../api/products-api.service';
import { CreateProductDto } from '@shop/common-api';
import { AdminProductsFacade } from './admin-products.facade';

@Injectable()
export class AdminProductsEffects {
  private readonly $actions = inject(Actions);
  private readonly productsApiService = inject(ProductsApiService);
  private readonly router = inject(Router);

  createProduct$ = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(AdminProductsActions.createproduct),
        exhaustMap(({ product }) => {
          const { image, name, price, category } = product;
          const newProduct: CreateProductDto = { name, price, category };

          return this.productsApiService.createProduct(newProduct, image).pipe(
            tap(() => {
              this.router.navigate(['/admin/products']);
            }),
            catchError(() => {
              // TODO KN Handle error
              return EMPTY;
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}
