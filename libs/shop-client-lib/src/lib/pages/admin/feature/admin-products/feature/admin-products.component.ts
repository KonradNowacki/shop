import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import {RouterLink} from "@angular/router";
import {AdminProductsService} from "../../../data-access/admin-products.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import {ButtonComponent} from "@shop/common-ui";

// TODO KN Move the table to a common generic component

@Component({
  selector: 'shop-admin-products',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterLink, FontAwesomeModule, ButtonComponent],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  protected readonly faTrash = faTrash;
  protected readonly faPenToSquare = faPenToSquare;

  private readonly adminProductsService = inject(AdminProductsService)
  protected readonly products$ = this.adminProductsService.getProducts();

  removeProduct(id: number) {
    this.adminProductsService.removeProduct(id);
  }
}
