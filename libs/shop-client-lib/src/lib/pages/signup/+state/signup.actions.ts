import {createActionGroup, props} from "@ngrx/store";
import {SignupModel} from "./signup.model";

export const SignupActions = createActionGroup({
  source: 'SIGNUP',
  events: {
    createUser: props<{ user: SignupModel }>()
  }
})
