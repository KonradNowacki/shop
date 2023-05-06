import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import {ButtonComponent} from "@shop/shared-ui";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "@shop/shop-client-lib";
import {JsonPipe, NgIf} from "@angular/common";
import {TranslocoModule} from "@ngneat/transloco";

@Component({
  selector: 'shop-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterLink, NgIf, JsonPipe, TranslocoModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  protected async logout() {
    this.authService.logout();
    await this.router.navigateByUrl('signup')
  }
}
