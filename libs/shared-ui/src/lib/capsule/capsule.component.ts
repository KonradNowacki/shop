import {
  ChangeDetectionStrategy,
  Component, HostBinding, Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Colors, ColorTypeClass, Types} from "./capsule.model";

@Component({
  selector: 'button[shop-capsule]',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrls: ['./capsule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapsuleComponent {

  @Input() color: Colors = 'primary';
  @Input() type: Types = 'basic';

  @HostBinding('class')
  get capsuleClass(): ColorTypeClass {
    return `${this.type}--${this.color}`
  }

}
