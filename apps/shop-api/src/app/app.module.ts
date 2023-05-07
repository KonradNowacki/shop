import {Module} from "@nestjs/common";
import {UserModule} from "./domains/user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./domains/user/user.entity";
import {ProductModule} from "./domains/product/product.module";
import {Product} from "./domains/product/product.entity";
import {AuthModule} from "./domains/auth/auth.module";
import {ConfigModule} from "@nestjs/config";

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
  constructor() {
    console.log(process.env.DATABASE_USER)
  }
}
