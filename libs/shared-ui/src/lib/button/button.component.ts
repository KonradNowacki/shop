import {Component, HostBinding, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Colors, ColorTypeClass, Types} from "./button.model";

@Component({
  selector: '[shop-button]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color: Colors = 'primary';
  @Input() type: Types = 'basic';

  @HostBinding('class')
  get buttonClass(): ColorTypeClass {
    return `${this.type}--${this.color}`
  }
}
