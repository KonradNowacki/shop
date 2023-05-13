import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeaheadDropdownOptionComponent } from './typeahead-dropdown-option.component';

describe('TypeaheadDropdownOptionComponent', () => {
  let component: TypeaheadDropdownOptionComponent;
  let fixture: ComponentFixture<TypeaheadDropdownOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeaheadDropdownOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeaheadDropdownOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
