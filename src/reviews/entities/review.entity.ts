import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongooose from 'mongoose'
import { Customer } from "src/customers/entities/customer.entity";
import { Product } from "src/products/entities/product.entity";

export type ReviewDocument = Review & mongooose.Document 

@Schema({timestamps: true})
export class Review {
    @Prop({type: mongooose.Schema.Types.ObjectId, ref: 'Product', required: true})
    product: Product

    @Prop({type: mongooose.Schema.Types.ObjectId, ref: 'Customer', required: true})
    customer: Customer

    @Prop({required: true})
    content: string

    @Prop({required: true})
    rating: number
}


export const ReviewSchema = SchemaFactory.createForClass(Review)