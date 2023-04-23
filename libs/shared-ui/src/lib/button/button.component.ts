import {Component, HostBinding, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @Input()
  color: 'primary' | 'secondary' | 'success' | 'warn' | 'error' = 'primary';
  @Input() type: 'basic' | 'outline' = 'basic';

  @HostBinding('class')
  get buttonClass() {
    return `${this.type}--${this.color}`
  }
}
