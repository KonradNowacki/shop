import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {UserModule} from "./domains/user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./domains/user/user.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    UserModule,

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),

    JwtModule.register({
      global: true,
      secret: 'JWT_SECRET', // TODO KN Move outside of code
      signOptions: { expiresIn: '60s' },
    }),
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
