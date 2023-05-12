import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {TranslocoModule} from "@ngneat/transloco";

@Component({
  selector: 'shop-logout-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoModule],
  template: `
    logged out successfully
    <a routerLink="signin">{{ 'label.signin' | transloco }}</a>
  `,
  styleUrls: ['./logout-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutShellComponent {}
