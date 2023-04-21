import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Product} from "./product.entity";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {
  }

  async createProduct(name: string, price: number) {
    const product = this.productRepository.create({ name, price });
    return await this.productRepository.save(product);
  }

}
