import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Colors, ColorTypeClass } from './capsule.model';
import {Sizes, Variants} from '../button/button.model';

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

  @HostBinding('style.height') protected height = '40px';

  @Input() set size(value: Sizes) {
    switch (value) {
      case 'small': this.height= '30px'; break;
      case 'medium': this.height= '40px'; break;
      case 'large': this.height= '50px'; break;
      default: this.height= '40px'; break;
    }
  }
}
