import { IsIn } from "class-validator";
import { OrderStatus } from "../entities/order.entity";

export class UpdateOrderDto {
    @IsIn([OrderStatus.ACCEPTED, OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.PENDING, OrderStatus.REJECTED])
    order_status: OrderStatus
}
