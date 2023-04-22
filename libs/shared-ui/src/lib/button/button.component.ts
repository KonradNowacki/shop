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
  @Input() @HostBinding('class') type: 'basic' | 'outline' = 'basic';
}
