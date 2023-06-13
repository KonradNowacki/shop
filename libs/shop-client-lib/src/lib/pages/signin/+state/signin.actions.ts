import { createActionGroup, props } from '@ngrx/store';
import { SigninModel } from './signin.model';

export const SigninActions = createActionGroup({
  source: 'SIGNIN',
  events: {
    signin: props<{ credentials: SigninModel }>(),
  },
});
