import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsShellComponent } from './product-details-shell.component';

describe('ProductDetailsShellComponent', () => {
  let component: ProductDetailsShellComponent;
  let fixture: ComponentFixture<ProductDetailsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
