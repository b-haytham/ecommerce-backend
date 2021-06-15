import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose'

export type BrandDocument = Brand & mongoose.Document  

@Schema({timestamps: true})
export class Brand {

    @Prop({default: null})
    image: string

    @Prop({required: true})
    name: string

    @Prop({required: true})
    display_name: string

    @Prop({required: true})
    description: string

    @Prop({required: true, default: 0})
    product_number: number
}

export const BrandSchema = SchemaFactory.createForClass(Brand)