import { Meta } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
} as Meta<ButtonComponent>;

export const Button = {
  render: (args: ButtonComponent) => ({
    template:
      '<button shop-button [type]="type" [color]="color">Button</button>',
    props: args,
  }),
  argTypes: {
    type: {
      options: ['basic', 'outline'],
      control: { type: 'radio' },
      default: 'basic',
    },
    color: {
      options: ['primary', 'secondary', 'success', 'warn', 'error'],
      control: { type: 'radio' },
    },
  },
};
