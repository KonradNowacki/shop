import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminProductAddForm} from "../../utils/admin-product-add.form";
import {
  ButtonComponent,
  InputComponent,
  TypeaheadDropdownComponent,
  TypeaheadDropdownOptionComponent
} from "@shop/common-ui";
import {TranslocoModule} from "@ngneat/transloco";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductCategory} from "@shop/common-utils";
import {AdminProductsService} from "../../../../data-access/admin-products.service";
import {AdminProductModel} from "../../../../+store/admin-product.model";

@Component({
  selector: 'shop-admin-product-add-shell',
  standalone: true,
  imports: [CommonModule, InputComponent, TranslocoModule, ReactiveFormsModule, ButtonComponent, TypeaheadDropdownComponent, TypeaheadDropdownOptionComponent],
  templateUrl: './admin-product-add-shell.component.html',
  styleUrls: ['./admin-product-add-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminProductAddForm]
})
export class AdminProductAddShellComponent {
  protected readonly form = inject(AdminProductAddForm).buildForm();
  protected readonly productCategories = Object.keys(ProductCategory);
  private readonly adminProductsService = inject(AdminProductsService)
  private readonly cd = inject(ChangeDetectorRef)

  get isProductCategoryRequired(): boolean {
    return this.form.controls.category.hasValidator(Validators.required);
  }

  submit(): void {
    if (this.form.valid) {
      const price = +(this.form?.controls?.price?.value ?? 0);
      const product = {
        ...this.form.value,
        price
      } as AdminProductModel;

      this.adminProductsService.addProduct(product);
    }
  }
}
