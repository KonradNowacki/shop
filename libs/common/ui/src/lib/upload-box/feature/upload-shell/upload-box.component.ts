import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from '../../../button/button.component';
import { UploadDirective } from '../../util/upload-directive/upload.directive';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'shop-upload-box',
  standalone: true,
  imports: [CommonModule, TranslocoModule, ButtonComponent, UploadDirective],
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadBoxComponent,
      multi: true,
    },
  ]
})
export class UploadBoxComponent implements ControlValueAccessor {
  protected readonly control = new FormControl<File | null>(null);

  private onChange = (value: any) => {};
  private onTouch = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  selectFile(file: File) {
    // const file = event.target?.['files'][0]
    this.control.setValue(file);
    this.onChange(file);
    this.onTouch();
  }
}
