import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import {RouterLink} from "@angular/router";
import {JsonPipe, NgIf} from "@angular/common";
import {TranslocoModule} from "@ngneat/transloco";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'shop-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterLink, NgIf, JsonPipe, TranslocoModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

}
