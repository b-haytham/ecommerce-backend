import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Brand } from "src/brands/entities/brand.entity";
import { Category } from "src/categories/entities/category.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Size } from "src/sizes/entities/size.entity";
import { Subcategory } from "src/subcategories/entities/subcategory.entity";

export type ProductDocument = Product & mongoose.Document 

@Schema({timestamps: true})
export class Product {

    @Prop({required: true})
    name: string

    @Prop({required: true})
    display_name: string

    @Prop({default: null})
    thumbnail: string

    @Prop([String])
    images: string[]

    @Prop([String])
    product_details: string[]

    @Prop([String])
    shippment_details: string[]

    @Prop([String])
    other_info: string[]

    @Prop({default: 0})
    views_number: number

    @Prop({default: 0})
    sold_number: number

    @Prop({default: 0})
    add_cart_number: number

    @Prop({required: true})
    price: number

    @Prop({required: true, default: 0})
    count: number


    @Prop({required: true})
    in_stock: boolean


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Brand', default: null})
    brand: Brand

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null})
    category: Category
 
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', default: null})
    sub_category: Subcategory 

    @Prop(raw({
        have_size: { type: Boolean, default: false },
        size_system: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', default: null },
        available_sizes: {type: [String] }
    }))
    size_info: Record<string, any>

    @Prop(raw({
        have_color: { type: Boolean, default: false },
        available_colors: [{ name: String, hex_code: String }] 
    }))
    color_info: Record<string, any>

    @Prop(raw({
        have_discount: { type: Boolean, default: false },
        discount_percentage: { type: Number, default: null }
    }))
    discount_info: Record<string, any>


    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]})
    reviews: Review[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
