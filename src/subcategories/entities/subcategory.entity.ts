import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Category } from "src/categories/entities/category.entity";
import * as mongoose from 'mongoose'


export type SubcategoryDocument = Subcategory & mongoose.Document

@Schema({timestamps: true})
export class Subcategory {
    
    @Prop({required: true})
    name: string

    @Prop({required: true})
    display_name: string

    @Prop({required: true})
    description: string


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    category: Category

    @Prop({required: true, default: 0})
    product_number: number
}


export const SubcategorySchema = SchemaFactory.createForClass(Subcategory)