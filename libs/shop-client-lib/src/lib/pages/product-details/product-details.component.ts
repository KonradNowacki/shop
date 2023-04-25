import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shop-product-details',
  standalone: true,
  imports: [CommonModule],
  template: `<p>product-details works!</p>`,
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {}
