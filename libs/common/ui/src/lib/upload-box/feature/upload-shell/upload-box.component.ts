import { Component } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from '../../../button/button.component';
import { UploadDirective } from '../../util/upload-directive/upload.directive';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'shop-upload-box',
  standalone: true,
  imports: [NgIf, CommonModule, TranslocoModule, ButtonComponent, UploadDirective],
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
  protected imageSrc = ''
  protected isLoadingImagePreview = false;

  private onChange = (value: any) => {};
  private onTouch = () => {};

  get filename(): string {
    return this.control.value?.name ?? '';
  }

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
    this.isLoadingImagePreview = true;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.isLoadingImagePreview = false;
    };

    this.control.setValue(file);
    this.onChange(file);
    this.onTouch();
  }





}
