import { Meta } from '@storybook/angular';
import { AuthCardComponent } from './auth-card.component';

export default {
  title: 'AuthCardComponent',
  component: AuthCardComponent,
} as Meta<AuthCardComponent>;

export const Primary = {
  render: (args: AuthCardComponent) => ({
    props: args,
  }),
  args: {
    title: '',
  },
};
