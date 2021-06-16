import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderItemDto } from './dto/orderitems/create-order-item';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem, OrderItemDocument } from './entities/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem.name)
    private orderItemModel: Model<OrderItemDocument>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const p = await this.productsService.findbyId(
      createOrderItemDto.product_id,
    );
    if (!p) throw new NotFoundException('Product Not Found');

    const price = p.price * createOrderItemDto.quantity 

    return this.orderItemModel.create({
      product: p._id,
      quantity: createOrderItemDto.quantity,
      size: createOrderItemDto.size ? createOrderItemDto.size : null,
      color: createOrderItemDto.color ? createOrderItemDto.color : null,
      price
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
