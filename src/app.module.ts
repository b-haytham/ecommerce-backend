import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { BrandsModule } from './brands/brands.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SizesModule } from './sizes/sizes.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommentsModule } from './comments/comments.module';

import * as path from 'path'

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
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public')
    }),
    AddressesModule,
    CustomersModule,
    CategoriesModule,
    SubcategoriesModule,
    BrandsModule,
    SizesModule,
    ProductsModule,
    ReviewsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
