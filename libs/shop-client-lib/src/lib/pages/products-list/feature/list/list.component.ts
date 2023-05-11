import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "@shop/common-ui";

@Component({
  selector: 'shop-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <section>
      <shop-product-card *ngFor="let i of [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]"></shop-product-card>
    </section>
  `,
  styles: [`
    section {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      gap: 15px;
      justify-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {}
