import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductCategory, TypedFormGroup} from "@shop/common-utils";
import {CreateProductDto} from "@shop/common-api";

@Injectable()
export class AdminProductAddForm {

  buildForm(): FormGroup<TypedFormGroup<CreateProductDto>> {
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
