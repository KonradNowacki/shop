import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AdminProductDetailsDto,
  AdminProductDto,
  CreateProductDto,
} from '@shop/common-api';
import {FormDataKey} from "@shop/common-utils";

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
    image: File
  ): Observable<HttpEvent<AdminProductDto>> {
    const formData = new FormData();
    formData.append(FormDataKey.DATA, JSON.stringify(product)); // TODO How to type it?
    formData.append(FormDataKey.IMAGE, image); // TODO Add image and data to enums

    return this.httpClient.post<AdminProductDto>(
      'http://localhost:3000/products',
      formData,
      { observe: 'events' }
    );
  }

  getLoggedInUsersProductDetails(
    productId: number
  ): Observable<AdminProductDetailsDto> {
    return this.httpClient.get<AdminProductDetailsDto>(
      `http://localhost:3000/products/my/${productId}`
    );
  }
}
