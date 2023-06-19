import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Product } from './product.entity';
import { EmailString, ProductCategory } from '@shop/common-utils';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import {UpdateProductDto} from "../../../../common/api-contract/src/lib/update-product.dto";

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


  async updateProduct(
    id: number,
    data: UpdateProductDto,
    email: EmailString,
  ) {
      await this.productRepository.update({ id }, { ...data });

      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['owner'],
      });

      if (!product) {
        throw new NotFoundException();
      }

      if(product.owner.email !== email) {
        throw new UnauthorizedException();
      }

      return product;
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
        owner
      },
      take: limit,
    });
  }

  async getLoggedUsersProductDetails(id: number, ownerEmail: EmailString): Promise<Product | null> {
    const product = await this.productRepository.findOne({
    where: { id },
      relations: ['owner'],
  });
    if (!product) {
      throw new NotFoundException();
    }
    if (product.owner.email !== ownerEmail) {
      throw new UnauthorizedException();
    }



    return product;

  }

  async deleteProduct(id: number, ownerEmail: EmailString): Promise<void> {
    const product = await this.productRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    if (!product) {
      throw new NotFoundException();
    }
    if (product.owner.email !== ownerEmail) {
      throw new UnauthorizedException();
    }

    await this.productRepository.delete({ id });
  }
}
