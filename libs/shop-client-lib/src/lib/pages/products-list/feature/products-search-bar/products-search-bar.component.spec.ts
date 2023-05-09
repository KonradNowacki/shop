import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsSearchBarComponent } from './products-search-bar.component';

describe('ProductsSearchBarComponent', () => {
  let component: ProductsSearchBarComponent;
  let fixture: ComponentFixture<ProductsSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
