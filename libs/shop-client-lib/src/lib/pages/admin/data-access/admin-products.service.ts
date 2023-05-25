import {inject, Injectable} from "@angular/core";
import {ProductsApiService} from "../../../api/products-api.service";
import {Observable} from "rxjs";
import {AdminProductDetailsDto, AdminProductDto} from "@shop/common-api";
import {AdminProductModel} from "../+store/admin-product.model";
import {AdminProductsFacade} from "../+store/admin-products.facade";

@Injectable()
export class AdminProductsService {

  private readonly productsApiService = inject(ProductsApiService);
  private readonly adminProductsFacade = inject(AdminProductsFacade);

  getLoggedUsersProducts(): Observable<AdminProductDto[]> {
    return this.productsApiService.getLoggedInUsersProducts();
  }

  addProduct(product: AdminProductModel): void {
    this.adminProductsFacade.createProduct(product);
  }

  getAdminProducts(): Observable<AdminProductModel[]> {
    return this.productsApiService.getLoggedInUsersProducts();
  }

  getAdminProductDetails(productId: number): Observable<AdminProductDetailsDto> {
    return this.productsApiService.getLoggedInUsersProductDetails(productId);
  }

}
