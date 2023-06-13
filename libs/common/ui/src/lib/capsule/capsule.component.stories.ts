import { Meta } from '@storybook/angular';
import { CapsuleComponent } from './capsule.component';

export default {
  title: 'CapsuleComponent',
  component: CapsuleComponent,
} as Meta<CapsuleComponent>;

export const Capsule = {
  render: (args: CapsuleComponent) => ({
    template:
      '<button shop-capsule [type]="type" [color]="color">Capsule</button>',
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
