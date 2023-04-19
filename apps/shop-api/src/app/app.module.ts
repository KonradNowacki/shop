import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {UserModule} from "./domains/user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./domains/user/user.entity";

@Module({
  imports: [
    UserModule,

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    })
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // TODO KN Use it when middleware is ready
    // consumer.apply(AuthMiddleware).forRoutes({
    //   path: '*'
    // })
  }

}
