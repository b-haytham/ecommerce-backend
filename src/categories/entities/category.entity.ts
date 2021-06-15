import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';

export type CategoryDocument = Category & mongoose.Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  display_name: string;

  @Prop({ required: true })
  description: string

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory'}]})
  sub_categories: Subcategory[]

  @Prop({ required: true, default: 0 })
  product_number: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
