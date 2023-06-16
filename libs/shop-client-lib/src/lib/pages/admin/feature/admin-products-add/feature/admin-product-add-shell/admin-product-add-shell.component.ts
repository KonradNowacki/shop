import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductAddForm } from '../../utils/admin-product-add.form';
import {
  ButtonComponent,
  InputComponent,
  TypeaheadDropdownComponent,
  TypeaheadDropdownOptionComponent,
  UploadBoxComponent,
} from '@shop/common-ui';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {ProductCategory, RouterData} from '@shop/common-utils';
import { AdminProductsService } from '../../../../data-access/admin-products.service';
import { AdminProductModel } from '../../../../+store/admin-product.model';
import {
  ControlErrorAnchorDirective,
  ControlErrorsDirective,
  FormActionDirective,
} from '@ngneat/error-tailor';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'shop-admin-product-add-shell',
  standalone: true,
  templateUrl: './admin-product-add-shell.component.html',
  styleUrls: ['./admin-product-add-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminProductAddForm],
  imports: [
    CommonModule,
    InputComponent,
    TranslocoModule,
    ReactiveFormsModule,
    ButtonComponent,
    TypeaheadDropdownComponent,
    TypeaheadDropdownOptionComponent,
    FormActionDirective,
    ControlErrorsDirective,
    ControlErrorAnchorDirective,
    UploadBoxComponent,
  ],
})
export class AdminProductAddShellComponent implements OnInit {

  @Input(RouterData.EDITED_PRODUCT) editedProduct?: any;

  protected readonly form = inject(AdminProductAddForm).buildForm();
  protected readonly productCategories = Object.keys(ProductCategory);
  private readonly adminProductsService = inject(AdminProductsService);

  get isProductCategoryRequired(): boolean {
    return this.form.controls.category.hasValidator(Validators.required);
  }

  ngOnInit() {
    if (this.editedProduct) {
      this.form.patchValue(this.editedProduct);
    }

    console.log('this.editedProduct', this.editedProduct)
  }

  submit(): void {
    if (this.form.valid) {
      const price = +(this.form?.controls?.price?.value ?? 0);
      const product = { ...this.form.value, price } as AdminProductModel;
      this.adminProductsService.addProduct(product);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
