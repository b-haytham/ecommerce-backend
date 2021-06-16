import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";
import { OrderStatus } from "../entities/order.entity";

export class UpdateOrderDto {
    @IsIn([OrderStatus.ACCEPTED, OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.PENDING, OrderStatus.REJECTED])
    @ApiProperty({enum: OrderStatus})
    order_status: OrderStatus
}
