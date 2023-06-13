import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsService } from '../../data-access/admin-products.service';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'shop-admin-products',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  private readonly adminProductsService = inject(AdminProductsService);

  protected readonly products$ = this.adminProductsService.getAdminProducts();
}
