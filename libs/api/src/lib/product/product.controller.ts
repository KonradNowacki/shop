import {
  ArgumentMetadata,
  Body,
  Controller,
  Get,
  Injectable,
  Logger,
  NotFoundException,
  Param,
  PipeTransform,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from './product.entity';
import {
  EmailString,
  ProductCategory,
  QueryParam,
  RolesEnum,
} from '@shop/common-utils';
import { ApiTags } from '@nestjs/swagger';
import {
  AdminProductDetailsDto,
  AdminProductDto,
  CreateProductDto,
} from '@shop/common-api';
import { User } from '../auth/user.decorator';
import { ProductMapper } from './product.mapper';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return JSON.parse(value);
  }

}

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  // TODO KN Move FileInterceptor logic to a separate interceptor & valdator
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void
        ) {
          const fileName = `${Date.now()}-${file.originalname.replace(
            /\s/g,
            '_'
          )}`;
          callback(null, fileName);
        },
      }),
    })
  )
  async createProduct(
    @Body('data', CustomPipe, ValidationPipe) data: CreateProductDto,
    @User('email') email: EmailString,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<Product> {
    this.logger.log(
      `${ProductController.name} invoked signup createProduct name ${data.name}`
    );

    const { name, price, category } = data;

    return await this.productService.createProduct(
      name,
      price,
      category,
      email,
      file?.filename ?? undefined
    );
  }

  @Get()
  async getPublicProducts(
    @Query(QueryParam.CATEGORY) category?: ProductCategory,
    @Query(QueryParam.MIN_PRICE) minPrice?: number,
    @Query(QueryParam.MAX_PRICE) maxPrice?: number,
    @Query(QueryParam.LIMIT) limit?: number
  ): Promise<Product[]> {
    this.logger.log(`${ProductController.name} invoked getPublicProducts`);
    return await this.productService.getProducts(
      undefined,
      category,
      minPrice,
      maxPrice,
      limit
    );
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  async getLoggedUsersProducts(
    @User('email') email: EmailString,
    @Query(QueryParam.CATEGORY) category?: ProductCategory,
    @Query(QueryParam.MIN_PRICE) minPrice?: number,
    @Query(QueryParam.MAX_PRICE) maxPrice?: number,
    @Query(QueryParam.LIMIT) limit?: number
  ): Promise<AdminProductDto[]> {
    this.logger.log(`${ProductController.name} invoked getLoggedUsersProducts`);
    const products = await this.productService.getProducts(
      email,
      category,
      minPrice,
      maxPrice,
      limit
    );

    console.log('products', products);

    return products.map(ProductMapper.entityToAdminProductDto);
  }

  @Get('my/:productId')
  @UseGuards(JwtAuthGuard)
  // TODO KN Use guard that checks if required product ihas owner the logged in user
  async getLoggedUsersProductDetails(
    @User('email') email: EmailString,
    @Param('productId') productId: number
  ): Promise<AdminProductDetailsDto> {
    this.logger.log(
      `${ProductController.name} invoked getLoggedUsersProductDetails with productId ${productId}`
    );
    const product = await this.productService.getLoggedUsersProductDetails(
      productId
    );

    if (!product) {
      throw new NotFoundException();
    }

    return ProductMapper.entityToAdminProductDetailsDto(product);
  }
}
