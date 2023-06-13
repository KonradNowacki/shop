import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAddShellComponent } from './admin-product-add-shell.component';

describe('AdminProductAddShellComponent', () => {
  let component: AdminProductAddShellComponent;
  let fixture: ComponentFixture<AdminProductAddShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductAddShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductAddShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
