import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {AuthModule, ProductModule, ShopTypeormModule, UserModule} from "@shop/api";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    UserModule,
    ProductModule,
    AuthModule,

    ShopTypeormModule
  ],
})
export class AppModule {
}
