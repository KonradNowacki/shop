import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  inject,
  OnInit,
  QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "../input/input.component";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {TypeaheadDropdownOptionComponent} from "./typeahead-dropdown-option/typeahead-dropdown-option.component";
import {Observable, of} from "rxjs";

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
export class TypeaheadDropdownComponent implements ControlValueAccessor, OnInit, AfterContentInit {

  @ContentChildren(TypeaheadDropdownOptionComponent)
  private readonly options: QueryList<TypeaheadDropdownOptionComponent> | undefined;

  protected readonly control = new FormControl<string>('');
  protected isOptionsDisplayed = false;

  private readonly cd = inject(ChangeDetectorRef)

  private onChange = (value: any) => {}
  private onTouch = () => {}


  ngOnInit() {
    // this.control.valueChanges.subscribe(val => {
    //   this.isOptionsDisplayed = true;
    //   console.log(val)
    //   this.options?.map(o => ({ ...o, isDisplayed: o.label.includes(val || '') }))
    // })
  }

  ngAfterContentInit() {
    this.control.valueChanges.subscribe(val => {
      this.isOptionsDisplayed = true;
      console.log(val)

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

}
