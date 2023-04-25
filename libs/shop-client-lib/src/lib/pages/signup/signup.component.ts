import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shop-signup',
  standalone: true,
  imports: [CommonModule],
  template: `<p>signup works!</p>`,
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {}
