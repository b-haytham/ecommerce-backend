import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CustomersModule } from './customers/customers.module';
import { CurrentUserMiddleware } from './middlewares/CurrentUserMiddleware';
import { UsersService } from './users/users.service';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AddressesModule,
    CustomersModule,
    CategoriesModule,
    SubcategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
