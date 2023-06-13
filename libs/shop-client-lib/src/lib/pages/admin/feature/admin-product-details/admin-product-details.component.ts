import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminProductsService } from '../../data-access/admin-products.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'shop-admin-product-details',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductDetailsComponent {
  private readonly adminProductsService = inject(AdminProductsService);

  protected readonly productDetails$ =
    this.adminProductsService.getAdminProductDetails(8);
}
