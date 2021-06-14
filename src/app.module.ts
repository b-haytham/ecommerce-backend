import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { JwtModule } from '@nestjs/jwt';
import { CustomersModule } from './customers/customers.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
