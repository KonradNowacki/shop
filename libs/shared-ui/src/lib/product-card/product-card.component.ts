import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shop-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {}
