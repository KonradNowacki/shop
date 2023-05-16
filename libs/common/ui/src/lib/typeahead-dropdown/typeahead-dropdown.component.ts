import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  inject,
  Input,
  QueryList,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from "../input/input.component";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {TypeaheadDropdownOptionComponent} from "./typeahead-dropdown-option/typeahead-dropdown-option.component";

@Component({
  selector: 'shop-typeahead-dropdown',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './typeahead-dropdown.component.html',
  styleUrls: ['./typeahead-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TypeaheadDropdownComponent,
      multi: true
    }
  ]
})
export class TypeaheadDropdownComponent implements ControlValueAccessor, AfterContentInit {

  @Input() label: string;
  @Input() isRequired = false;

  @ContentChildren(TypeaheadDropdownOptionComponent)
  private readonly options: QueryList<TypeaheadDropdownOptionComponent> | undefined;
  protected isOptionsDisplayed = false;
  protected readonly control = new FormControl<string>('');

  private readonly cd = inject(ChangeDetectorRef)

  private onChange = (value: any) => {}
  private onTouch = () => {}

  ngAfterContentInit() {
    this.control.valueChanges.subscribe(val => {

      this.options?.map(o => {
        o.isDisplayed = o.label.toLowerCase().includes(val?.toLowerCase() || '')
        o.searchText = val || '';
        return { ...o }
      })

    })
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  select(value: any, label: string) {
    this.control.setValue(label);
    this.isOptionsDisplayed = false;
    this.onChange(value)
    this.cd.detectChanges();
  }

  onInputFocused(): void {
    this.isOptionsDisplayed = true
  }

}
