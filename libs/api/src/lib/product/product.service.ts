import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Product } from './product.entity';
import { EmailString, ProductCategory } from '@shop/common-utils';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UserService
  ) {}

  async createProduct(
    name: string,
    price: number,
    category: ProductCategory,
    email: EmailString,
    filename?: string
  ) {
    const owner = await this.userService.findUserByEmail(email);

    const product = this.productRepository.create({
      name,
      price,
      owner,
      category,
      filename,
    });

    return await this.productRepository.save(product, { transaction: true });
  }

  async getProducts(
    ownerEmail?: EmailString,
    category?: ProductCategory,
    minPrice = 0,
    maxPrice = 999999,
    limit = 10
  ): Promise<Product[]> {
    let owner: User | undefined = undefined;

    if (ownerEmail) {
      owner = await this.userService.findUserByEmail(ownerEmail);
    }

    return await this.productRepository.find({
      where: {
        category,
        price: Between(minPrice, maxPrice),
        // owner
      },
      take: limit,
    });
  }

  // async getLoggedUsersProducts(email: EmailString): Promise<Product[]> {
  //   const owner = await this.userService.findUserByEmail(email);
  //
  //   return await this.productRepository.find({
  //     where: { owner }
  //   })
  // }

  async getLoggedUsersProductDetails(id: number): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException();
    }
    await this.productRepository.delete({ id });
  }
}
