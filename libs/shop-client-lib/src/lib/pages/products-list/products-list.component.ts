import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shop-products-list',
  standalone: true,
  imports: [CommonModule],
  template: `<p>products-list works!</p>`,
  styleUrls: ['./products-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {}
