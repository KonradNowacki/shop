import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../button/button.component";
import {TranslocoModule} from "@ngneat/transloco";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {CapsuleComponent} from "../capsule/capsule.component";

@Component({
  selector: 'shop-product-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslocoModule, FontAwesomeModule, CapsuleComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  protected readonly faPlus = faPlus;
}
