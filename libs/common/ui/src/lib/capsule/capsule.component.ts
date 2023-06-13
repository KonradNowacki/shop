import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Colors, ColorTypeClass } from './capsule.model';
import { Variants } from '../button/button.model';

@Component({
  selector: 'button[shop-capsule]',
  standalone: true,
  imports: [],
  template: ` <ng-content></ng-content>`,
  styleUrls: ['./capsule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapsuleComponent {
  @Input() color: Colors = 'primary';
  @Input() variant: Variants = 'basic';

  @HostBinding('class')
  get capsuleClass(): ColorTypeClass {
    return `${this.variant}--${this.color}`;
  }
}
