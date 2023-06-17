import { inject, Injectable } from '@angular/core';
import { ProductsApiService } from '../../../api/products-api.service';
import { Observable } from 'rxjs';
import { AdminProductDetailsDto, AdminProductDto } from '@shop/common-api';
import { AdminProductModel } from '../+store/admin-product.model';
import { AdminProductsFacade } from '../+store/admin-products.facade';

@Injectable()
export class AdminProductsService {
  private readonly productsApiService = inject(ProductsApiService);
  private readonly adminProductsFacade = inject(AdminProductsFacade);

  addProduct(product: AdminProductModel): void {
    this.adminProductsFacade.createProduct(product);
  }

  getAdminProductDetails(
    productId: number
  ): Observable<AdminProductDetailsDto> {
    return this.productsApiService.getLoggedInUsersProductDetails(productId);
  }

  removeProduct(id: number): void {
    this.adminProductsFacade.removeProduct(id);
  }

  getProducts(): Observable<AdminProductModel[]> {
    return this.adminProductsFacade.getProducts();
  }
}
