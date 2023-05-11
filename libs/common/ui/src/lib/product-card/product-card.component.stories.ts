import { Meta } from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';

export default {
  title: 'ProductCardComponent',
  component: ProductCardComponent,
} as Meta<ProductCardComponent>;

export const Primary = {
  render: (args: ProductCardComponent) => ({
    props: args,
  }),
  args: {},
};
