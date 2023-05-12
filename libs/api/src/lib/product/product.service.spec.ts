import {Test} from "@nestjs/testing";
import {Repository} from "typeorm";
import {Product} from "./product.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {ProductService} from "./product.service";

describe('ProductService', () => {

  let productRepo: Repository<Product>
  let productService: ProductService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          }
        }
      ],
    }).compile();

    productRepo = moduleRef.get<Repository<Product>>(getRepositoryToken(Product));
    productService = moduleRef.get<ProductService>(ProductService);
  })

  describe('#createProduct', () => {
    it('should create and return a new product', async () => {
      // GIVEN
      const price = 999
      const name = 'Product Name';
      const expectedReturnValue = { id: 123, name, price }

      const createSpy = jest.spyOn(productRepo, 'create')
      jest.spyOn(productRepo, 'save').mockReturnValueOnce(Promise.resolve(expectedReturnValue))

      // WHEN
      const result = await productService.createProduct(name, price)

      // THEN
      expect(createSpy).toHaveBeenCalledWith({ name, price })
      expect(result).toEqual(expectedReturnValue)
    });
  });

  describe('#getPublicProducts', () => {
    it('should return all public products', async () => {
      // GIVEN
      const expectedReturnValue = [
        { id: 111, name: 'Product 1', price: 999 },
        { id: 222, name: 'Product 2', price: 888 },
        { id: 333, name: 'Product 3', price: 777 },
      ]

      jest.spyOn(productRepo, 'find').mockReturnValueOnce(Promise.resolve(expectedReturnValue))

      // WHEN
      const result = await productService.getProducts();

      // THEN
      expect(result).toEqual(expectedReturnValue);
    });
  });

});
