import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Colors, ColorTypeClass, Variants} from "./button.model";

@Component({
  selector: '[shop-button]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() color: Colors = 'primary';
  @Input() variant: Variants = 'basic';

  @HostBinding('class')
  get buttonClass(): ColorTypeClass {
    return `${this.variant}--${this.color}`
  }
}
