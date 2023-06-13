import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '@shop/common-ui';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'shop-admin-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonComponent,
    TranslocoModule,
    RouterLink,
  ],
  templateUrl: './admin-shell.component.html',
  styleUrls: ['./admin-shell.component.scss'],
})
export class AdminShellComponent {}
