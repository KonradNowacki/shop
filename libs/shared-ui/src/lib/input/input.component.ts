import {
  ChangeDetectionStrategy,
  Component, Input, OnInit,
} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {ControlErrorAnchorDirective, ControlErrorsDirective} from "@ngneat/error-tailor";

@Component({
  selector: 'shop-input',
  standalone: true,
  template: `
    <div class="input">
      <label class="input__label ">{{ label }}<span *ngIf="isRequired">*</span></label>
      <input
        [formControl]="control"
        class="input__field"
        [type]="type"
        [ngClass]="{'input__field--error': control.invalid && control.touched}"
        [controlErrorAnchor]="anchor"
      >
      <div class="input__hint" *ngIf="hint">{{ hint }}</div>
      <ng-template controlErrorAnchor #anchor="controlErrorAnchor"></ng-template>

    </div>
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule,
    JsonPipe,
    ControlErrorAnchorDirective,
    ControlErrorsDirective
  ]
})
export class InputComponent implements OnInit {

  protected isRequired = false
  @Input() type: 'text' | 'number' = 'text';
  @Input() label = '';
  @Input() hint = '';

  @Input() control!: FormControl;

  ngOnInit() {
    this.isRequired = this.control.hasValidator(Validators.required)
  }

}
