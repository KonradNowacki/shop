import { Component } from '@angular/core';
import { ProductsSearchBarComponent } from '../products-search-bar/products-search-bar.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'shop-products-list-shell',
  standalone: true,
  template: `
    <main>
      <shop-products-search-bar></shop-products-search-bar>
      <shop-list></shop-list>
    </main>
  `,
  styles: [
    `
      main {
        display: flex;
        flex-direction: column;
        justify-items: center;
      }
    `,
  ],
  imports: [ProductsSearchBarComponent, ListComponent],
})
export class ProductsListShellComponent {}
