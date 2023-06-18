import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AdminProductDetailsDto,
  AdminProductDto,
  CreateProductDto,
} from '@shop/common-api';
import { FormDataKey } from '@shop/common-utils';
import {UpdateProductDto} from "../../../../common/api-contract/src/lib/update-product.dto";

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  private readonly httpClient = inject(HttpClient);

  getLoggedInUsersProducts(): Observable<AdminProductDto[]> {
    return this.httpClient.get<AdminProductDto[]>(
      'http://localhost:3000/products/my'
    );
  }

  createProduct(
    product: CreateProductDto,
    image: File | null
  ): Observable<AdminProductDto> {
    const formData = new FormData();
    formData.append(FormDataKey.DATA, JSON.stringify(product));
    if (image) {
      formData.append(FormDataKey.IMAGE, image);
    }

    return this.httpClient.post<AdminProductDto>(
      'http://localhost:3000/products',
      formData
    );
  }

  updateProduct(
    productId: number,
    product: UpdateProductDto,
    image: File | null
  ): Observable<AdminProductDto> {
    const formData = new FormData();
    formData.append(FormDataKey.DATA, JSON.stringify(product));
    if (image) {
      formData.append(FormDataKey.IMAGE, image);
    }

    return this.httpClient.patch<AdminProductDto>(
      `http://localhost:3000/products/${productId}`,
      formData
    );
  }

  getLoggedInUsersProductDetails(
    productId: number
  ): Observable<AdminProductDetailsDto> {
    return this.httpClient.get<AdminProductDetailsDto>(
      `http://localhost:3000/products/my/${productId}`
    );
  }

  deleteProduct(id: number): Observable<unknown> {
    return this.httpClient.delete(`http://localhost:3000/products/${id}`);
  }
}
