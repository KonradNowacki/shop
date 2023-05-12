import {inject, Injectable} from "@angular/core";
import {ProductsApiService} from "../../../api/products-api.service";
import {Observable} from "rxjs";
import {AdminProductDto} from "@shop/common-api";

@Injectable()
export class AdminProductsService {

  private readonly productsApiService = inject(ProductsApiService);

  getLoggedUsersProducts(): Observable<AdminProductDto> {
    return this.productsApiService.getLoggedInUsersProducts();
  }

}
