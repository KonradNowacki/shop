import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'shop-signup-shell',
  standalone: true,
  template: `<p>signup-shell works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupShellComponent {}
