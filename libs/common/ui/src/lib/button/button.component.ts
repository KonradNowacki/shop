import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Colors, ColorTypeClass, Sizes, Variants} from './button.model';

@Component({
  selector: '[shop-button]',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() color: Colors = 'primary';
  @Input() variant: Variants = 'basic';

  @HostBinding('style.height') protected height = '40px';

  @Input() set size(value: Sizes) {
    switch (value) {
      case 'small': this.height= '30px'; break;
      case 'medium': this.height= '40px'; break;
      case 'large': this.height= '50px'; break;
      default: this.height= '40px'; break;
    }
  }

  @HostBinding('class')
  get buttonClass(): ColorTypeClass {
    return `${this.variant}--${this.color}`;
  }
}
