import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminProductDetailsDto, AdminProductDto, CreateProductDto} from "@shop/common-api";

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  private readonly httpClient = inject(HttpClient);

  getLoggedInUsersProducts(): Observable<AdminProductDto[]> {
    return this.httpClient.get<AdminProductDto[]>('http://localhost:3000/products/my');
  }

  createProduct(product: CreateProductDto): Observable<AdminProductDto> {
    return this.httpClient.post<AdminProductDto>('http://localhost:3000/products', {
      ...product
    }, {  });
  }

  getLoggedInUsersProductDetails(productId: number): Observable<AdminProductDetailsDto> {
    return this.httpClient.get<AdminProductDetailsDto>(`http://localhost:3000/products/my/${productId}`);
  }

}
