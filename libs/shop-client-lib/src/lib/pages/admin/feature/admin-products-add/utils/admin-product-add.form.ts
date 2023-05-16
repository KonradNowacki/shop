import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductCategory, TypedFormGroup} from "@shop/common-utils";
import {AdminProductModel} from "../../../+store/admin-product.model";

@Injectable()
export class AdminProductAddForm {

  buildForm(): FormGroup<TypedFormGroup<AdminProductModel>> {
    return new FormGroup({
        name: new FormControl<string>('', {
          validators: [Validators.required],
        }),

        price: new FormControl<number>(0, {
          validators: [Validators.required, Validators.min(0)],
        }),

        category: new FormControl<ProductCategory | null>(null, {
          validators: [Validators.required],
        }),

      }, {
        updateOn: 'change'
      }
    )
  }

}
