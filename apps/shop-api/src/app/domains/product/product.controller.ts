import {Body, Controller, Get, Logger, Post, Req, UseGuards} from "@nestjs/common";
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
  async createProduct(
    @Body() { name, price }: CreateProductDto,
    @Req() req
  ): Promise<Product> {
    this.logger.log(`${ProductController.name} invoked signup createProduct name ${name}`)
    return await this.productService.createProduct(name, price, req.user.email)
  }

  @Get()
  async getPublicProducts(): Promise<Product[]> {
    this.logger.log(`${ProductController.name} invoked getPublicProducts`);
    return await this.productService.getPublicProducts();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getLoggedUsersProducts(@Req() req): Promise<Product[]> {
    this.logger.log(`${ProductController.name} invoked getLoggedUsersProducts`);
    return await this.productService.getLoggedUsersProducts(req.user.email);
  }

}
