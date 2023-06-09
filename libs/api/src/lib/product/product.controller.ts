import {
  ArgumentMetadata,
  Body,
  Controller, Delete,
  Get,
  Injectable,
  Logger,
  NotFoundException,
  Param, ParseIntPipe, Patch,
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
  EmailString, FormDataKey,
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
import {UpdateProductDto} from "../../../../common/api-contract/src/lib/update-product.dto";

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
    FileInterceptor(FormDataKey.IMAGE, {
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
    @Body(FormDataKey.DATA, CustomPipe, ValidationPipe) data: CreateProductDto,
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

  // TODO KN Move FileInterceptor logic to a separate interceptor & valdator
  @Patch('/:productId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  @UseInterceptors(
    FileInterceptor(FormDataKey.IMAGE, {
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
  async updateProduct(
    @Body(FormDataKey.DATA, CustomPipe, ValidationPipe) data: UpdateProductDto,
    @User('email') email: EmailString,
    @Param('productId', ParseIntPipe) productId: number,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<Product> {
    this.logger.log(
      `${ProductController.name} invoked signup updateProduct name ${data.name}`
    );

    return await this.productService.updateProduct(productId, data, email);
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
    const product = await this.productService.getLoggedUsersProductDetails(productId, email);

    if (!product) {
      throw new NotFoundException();
    }

    return ProductMapper.entityToAdminProductDetailsDto(product);
  }

  @Delete('/:productId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.USER)
  async deleteProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @User('email') email: EmailString
  ): Promise<void> {
    this.logger.log(
      `${ProductController.name} invoked deleteProduct with productId ${productId}`
    );

    return await this.productService.deleteProduct(productId, email);
  }


}
