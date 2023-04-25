import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListShellComponent } from './products-list-shell.component';

describe('ProductsListShellComponent', () => {
  let component: ProductsListShellComponent;
  let fixture: ComponentFixture<ProductsListShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
