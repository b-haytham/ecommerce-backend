import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "src/products/entities/product.entity";

import * as mongoose from 'mongoose'
import { Order } from "./order.entity";

export type OrderItemDocument = OrderItem & mongoose.Document

@Schema({timestamps: true})
export class OrderItem {

    @Prop({type: mongoose.Schema.Types.ObjectId, default: null})
    order: Order

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true})
    product: Product

    @Prop({default: null})
    size: string

    @Prop({default: null})
    color: string

    @Prop({required: true, default: 1})
    quantity: number

    @Prop({required: true})
    price: number

}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem)