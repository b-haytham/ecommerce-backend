import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomersService } from 'src/customers/customers.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItemDocument } from './entities/order-item.entity';
import { Order, OrderDocument, OrderStatus } from './entities/order.entity';
import { OrderItemsService } from './order-items.service';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private orderItemsService: OrderItemsService,
    private customersService: CustomersService
  ) {}
  
  async create(createOrderDto: CreateOrderDto) {
    const oItems:OrderItemDocument[] = []

    for(const o of createOrderDto.order_items){
      const item  = await this.orderItemsService.create(o)
      oItems.push(item)
    }

    const customer = await this.customersService.findOne(createOrderDto.customer_id)
    if(!customer) throw new NotFoundException('Customer Not Found')
    
    let total = 0 
    oItems.forEach(o => total = total + o.price)

    const order = await this.orderModel.create({
      order_items: oItems.map(o=> o._id),
      total,
      customer: customer._id,
      order_status: OrderStatus.PENDING
    })

    for(const o of oItems) {
      o.order = order._id
      await o.save()
    }

    customer.orders.push(order._id)
    await customer.save()

    return order
  }

  findAll() {
    return this.orderModel.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async updateStatus(id: string, updateOrderDto: UpdateOrderDto) {
    const o = await this.orderModel.findById(id)
    if(!o) throw new NotFoundException('Order Not Found')

    if(updateOrderDto.order_status === OrderStatus.CANCELLED && o.order_status === OrderStatus.ACCEPTED) {
      throw new BadRequestException('Sorry you can not cancel order after is being Accepted')
    }
    o.order_status = updateOrderDto.order_status

    return o.save()
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
