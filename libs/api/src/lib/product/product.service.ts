import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Between, Repository} from "typeorm";
import {Product} from "./product.entity";
import {EmailString, ProductCategory} from "@shop/common-utils";
import {UserService} from "../user/user.service";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly userService: UserService
  ) {
  }

  async createProduct(name: string, price: number, category: ProductCategory, email: EmailString) {
    const owner = await this.userService.findUserByEmail(email);
    const product = this.productRepository.create({ name, price, owner, category });
    return await this.productRepository.save(product, { transaction: true });
  }

  async getPublicProducts(
    ownerEmail: EmailString,
    category: ProductCategory,
    minPrice = 0, maxPrice = 999999,
    limit: number
    ): Promise<Product[]> {
    const owner = await this.userService.findUserByEmail(ownerEmail);

    return await this.productRepository.find({
      where: {
        category,
        price: Between(minPrice, maxPrice),
        owner
      },
      take: limit
    });
  }

  // async getLoggedUsersProducts(email: EmailString): Promise<Product[]> {
  //   const owner = await this.userService.findUserByEmail(email);
  //
  //   return await this.productRepository.find({
  //     where: { owner }
  //   })
  // }

}
