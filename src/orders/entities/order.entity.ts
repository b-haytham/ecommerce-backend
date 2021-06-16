import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Customer } from "src/customers/entities/customer.entity";
import { OrderItem } from "./order-item.entity";

export type OrderDocument = Order & mongoose.Document

export enum OrderStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
    DELIVERED = "DELIVERED" 
} 

@Schema({timestamps: true})
export class Order {

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}]})
    order_items: OrderItem[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true})
    customer: Customer

    @Prop({required: true})
    total: number

    @Prop({required: true, enum: OrderStatus})
    order_status: OrderStatus
}

export const OrderSchema = SchemaFactory.createForClass(Order)