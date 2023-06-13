import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent, NavbarComponent } from '@shop/common-ui';
import { TranslocoModule } from '@ngneat/transloco';
import { NgIf } from '@angular/common';
import { AuthService } from '@shop/shop-client-lib';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    TranslocoModule,
    ButtonComponent,
    NgIf,
  ],
  selector: 'shop-root',
  template: `
    <shop-navbar>
      <div left-side></div>

      <div right-side>
        <ng-container *ngIf="!authService.isLoggedIn()">
          <button shop-button [routerLink]="'signup'" type="button">
            {{ 'button.signup' | transloco }}
          </button>
          <button shop-button [routerLink]="'signin'" type="button">
            {{ 'button.signin' | transloco }}
          </button>
        </ng-container>

        <ng-container *ngIf="authService.isLoggedIn()">
          <button
            shop-button
            [routerLink]="'admin'"
            variant="outline"
            color="success"
          >
            {{ 'button.your-panel' | transloco }}
          </button>
          {{ 'Logged as ' + authService.getLoggedInUser() }}
          <button shop-button (click)="logout()" type="button">
            {{ 'button.log-out' | transloco }}
          </button>
        </ng-container>
      </div>
    </shop-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigateByUrl('logout');
  }
}
