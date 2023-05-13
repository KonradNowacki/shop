import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeaheadDropdownComponent } from './typeahead-dropdown.component';

describe('TypeaheadDropdownComponent', () => {
  let component: TypeaheadDropdownComponent;
  let fixture: ComponentFixture<TypeaheadDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeaheadDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeaheadDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
