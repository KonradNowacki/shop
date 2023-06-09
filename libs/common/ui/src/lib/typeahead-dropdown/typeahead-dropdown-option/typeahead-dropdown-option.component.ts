import {
  Component,
  Host,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeaheadDropdownComponent} from "@shop/common-ui";
import {BoldTextFragmentPipe} from "../../bold-text-fragment-pipe/bold-text-fragment.pipe";

@Component({
  selector: 'shop-typeahead-dropdown-option',
  standalone: true,
  imports: [CommonModule, BoldTextFragmentPipe],
  templateUrl: './typeahead-dropdown-option.component.html',
  styleUrls: ['./typeahead-dropdown-option.component.scss']
})
export class TypeaheadDropdownOptionComponent {
  @Input() value: unknown;
  @Input() label: string;

  isDisplayed = true;
  searchText = ''

  constructor(
    @Host() protected readonly hostComponent: TypeaheadDropdownComponent
  ) {
  }

  select() {
    this.hostComponent.select(this.value, this.label)
  }

}
