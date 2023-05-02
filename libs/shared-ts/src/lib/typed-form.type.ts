import {FormControl} from "@angular/forms";

export type TypedFormGroup<T> = {
  readonly [K in keyof T]-?: FormControl<T[K] | null>
}
