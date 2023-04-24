import {Body, Controller, Get, Logger, Post, UseGuards} from "@nestjs/common";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Product} from "./product.entity";

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name)
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() { name, price }: CreateProductDto): Promise<Product> {
    this.logger.log(`${ProductController.name} invoked signup createProduct name ${name}`)
    return await this.productService.createProduct(name, price)
  }

  @Get()
  async getPublicProducts(): Promise<Product[]> {
    this.logger.log(`${ProductController.name} invoked getPublicProducts`);
    return await this.productService.getPublicProducts();
  }

}
