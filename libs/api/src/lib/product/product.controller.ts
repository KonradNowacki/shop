import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {ProductService} from "./product.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Product} from "./product.entity";
import {ProductCategory, QueryParam} from "@shop/common-utils";
import { ApiTags} from "@nestjs/swagger";
import {CreateProductDto} from "@shop/common-api";

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name)
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() { name, price, category }: CreateProductDto,
    @Req() req
  ): Promise<Product> {
    this.logger.log(`${ProductController.name} invoked signup createProduct name ${name}`)
    return await this.productService.createProduct(name, price, category, req.user.email)
  }

  @Get()
  async getPublicProducts(
    @Query(QueryParam.CATEGORY) category?: ProductCategory,
    @Query(QueryParam.MIN_PRICE) minPrice?: number,
    @Query(QueryParam.MAX_PRICE) maxPrice?: number,
    @Query(QueryParam.LIMIT) limit?: number,
  ): Promise<Product[]> {
    this.logger.log(`${ProductController.name} invoked getPublicProducts`);
    return await this.productService.getProducts(undefined, category, minPrice, maxPrice, limit);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getLoggedUsersProducts(
    @Req() req,
    @Query(QueryParam.CATEGORY) category?: ProductCategory,
    @Query(QueryParam.MIN_PRICE) minPrice?: number,
    @Query(QueryParam.MAX_PRICE) maxPrice?: number,
    @Query(QueryParam.LIMIT) limit?: number,
  ): Promise<Product[]> {
    this.logger.log(`${ProductController.name} invoked getLoggedUsersProducts`);
    return await this.productService.getProducts(req.user.email, category, minPrice, maxPrice, limit);
  }

}
