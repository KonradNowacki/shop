import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthApiService} from "../../../api/auth-api.service";
import {Router} from "@angular/router";
import {SigninActions} from "../../signin/+state/signin.actions";
import {catchError, EMPTY, exhaustMap, tap} from "rxjs";
import {AdminProductsActions} from "./admin-products.actions";
import {ProductsApiService} from "../../../api/products-api.service";
import {CreateProductDto} from "@shop/common-api";

@Injectable()
export class AdminProductsEffects {

  private readonly $actions = inject(Actions);
  private readonly productsApiService = inject(ProductsApiService);
  private readonly router = inject(Router);

  createProduct$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(AdminProductsActions.createproduct),
      exhaustMap(({ product }) => {
        const { name, price, category } = product;
        const newProduct: CreateProductDto = { name, price, category }
        return this.productsApiService.createProduct(newProduct).pipe(
          // TODO KN Append returned product to store
          catchError(() => {
            // TODO KN Handle error
            return EMPTY
          })
        )
      })
    )
  }, { dispatch: false })

}
