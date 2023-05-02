import {Module} from "@nestjs/common";
import {UserModule} from "./domains/user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./domains/user/user.entity";
import {ProductModule} from "./domains/product/product.module";
import {Product} from "./domains/product/product.entity";
import {AuthModule} from "./domains/auth/auth.module";

@Module({
  imports: [
    UserModule,
    ProductModule,
    AuthModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'shop',
      entities: [User, Product],
      synchronize: true,
    }),
  ],
})
export class AppModule {

}
