import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shop-signin',
  standalone: true,
  imports: [CommonModule],
  template: `<p>signin works!</p>`,
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {}
