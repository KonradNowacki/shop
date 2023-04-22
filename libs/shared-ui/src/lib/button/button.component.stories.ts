import {Meta, Story} from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
} as Meta<ButtonComponent>;

const Button: Story<ButtonComponent> = (args: ButtonComponent) => ({
  template: '<button shop-button [type]="type">Button</button>',
  props: args,
})

export const Basic = Button.bind({});
Basic.args = { type: 'basic' }

export const Outline = Button.bind({});
Outline.args = { type: 'outline' }
