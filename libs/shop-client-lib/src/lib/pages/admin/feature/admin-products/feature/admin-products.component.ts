import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsService } from '../../../data-access/admin-products.service';
import { TranslocoModule } from '@ngneat/transloco';
import {RouterLink} from "@angular/router";

// TODO KN Move the table to a common generic component

@Component({
  selector: 'shop-admin-products',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterLink],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  private readonly adminProductsService = inject(AdminProductsService);

  protected readonly products$ = this.adminProductsService.getAdminProducts();
}
