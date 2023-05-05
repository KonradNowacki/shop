import {FormControl} from "@angular/forms";

export type TypedFormGroup<T> = {
  [K in keyof T]: FormControl<T[K] | null>
}
