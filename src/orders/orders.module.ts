import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderItem, OrderItemSchema } from './entities/order-item.entity';
import { OrderItemsService } from './order-items.service';
import { ProductsModule } from 'src/products/products.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    ProductsModule,
    CustomersModule,
    MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}, {name: OrderItem.name, schema: OrderItemSchema}])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderItemsService],
  exports: [OrdersService]
})
export class OrdersModule {}
