import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../../../libs/api/src/lib/user/user.entity";
import {Product} from "../../../../libs/api/src/lib/product/product.entity";
import {ConfigModule} from "@nestjs/config";
import {AuthModule, ProductModule, UserModule} from "@shop/api";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    UserModule,
    ProductModule,
    AuthModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [User, Product],
      synchronize: true,
    }),
  ],
})
export class AppModule {
}
