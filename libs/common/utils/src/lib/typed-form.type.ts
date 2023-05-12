import {FormControl} from "@angular/forms";

export type TypedFormGroup<T> = {
  [K in keyof T]: FormControl<T[K] | null>
// [K in keyof T]: T[K] extends [] ? FormArray<FormControl<T[K] | null>> : FormControl<T[K] | null>
}
