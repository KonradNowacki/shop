import {Body, Controller, Logger, Post, UseGuards} from "@nestjs/common";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name)
  constructor(private readonly productService: ProductService) {
  }

  // Should be guarded to user only
  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() { name, price }: CreateProductDto) {
    this.logger.log(`${ProductController.name} invoked signup createProduct name ${name}`)
    return await this.productService.createProduct(name, price)
  }

}
