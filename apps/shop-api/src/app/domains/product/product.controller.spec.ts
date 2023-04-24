import {ProductService} from "./product.service";
import {Test} from "@nestjs/testing";
import {ProductController} from "./product.controller";
import {Product} from "./product.entity";
import {createMock} from "@golevelup/ts-jest";

describe('ProductController', () => {

  let productService: ProductService;
  let productController: ProductController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ProductService, useValue: createMock<ProductService>() }
      ],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
    productController = moduleRef.get<ProductController>(ProductController);
  })

  describe('#createProduct', () => {

    it('should return the created product', async () => {
      // GIVEN
      const product: Product = { id: 666, price: 999, name: 'Product 1' };

      jest.spyOn(productService, 'createProduct').mockReturnValueOnce(Promise.resolve(product));

      // WHEN
      const result = await productController.createProduct({ name: 'Product 1', price: 123 })

      // THEN
      expect(result).toEqual(product)
    })

  })

  describe('#getPublicProducts', () => {
    it('should return all public products', async () => {
      // GIVEN
      const product1: Product = { id: 666, price: 999, name: 'Product 1' };
      const product2: Product = { id: 111, price: 222, name: 'Product 2' };
      const product3: Product = { id: 444, price: 555, name: 'Product 3' };
      const products = [product1, product2, product3];

      jest.spyOn(productService, 'getPublicProducts').mockReturnValueOnce(Promise.resolve(products));

      // WHEN
      const result = await productController.getPublicProducts();

      // THEN
      expect(result).toEqual(products)
    });
  });

});
