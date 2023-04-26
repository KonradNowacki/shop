import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Product} from "./product.entity";
import {EmailString} from "@shop/shared-ts";
import {UserService} from "../user/user.service";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly userService: UserService
  ) {
  }

  async createProduct(name: string, price: number, email: EmailString) {
    const owner = await this.userService.findUserByEmail(email);
    const product = this.productRepository.create({ name, price, owner });
    return await this.productRepository.save(product);
  }

  async getPublicProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getLoggedUsersProducts(email: EmailString): Promise<Product[]> {
    const owner = await this.userService.findUserByEmail(email);

    return await this.productRepository.find({
      where: { owner }
    })
  }

}
