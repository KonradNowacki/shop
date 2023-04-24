import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shop-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `<nav></nav>`,
  styles: [
    `nav {
      width: 100%;
      height: 50px;
      background-color: red;
    }`
  ],
})
export class NavbarComponent {}
