import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req, UploadedFile,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Product} from "./product.entity";
import {ProductCategory, QueryParam} from "@shop/common-utils";
import {ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name)
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() { name, price, category }: CreateProductDto,
    @UploadedFile() image,
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
    return await this.productService.getPublicProducts(null, category, minPrice, maxPrice, limit);
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
    return await this.productService.getPublicProducts(req.user.email, category, minPrice, maxPrice, limit);
  }

}
