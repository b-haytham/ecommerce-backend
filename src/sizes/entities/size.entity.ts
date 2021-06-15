import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'

export type SizeDocument = Size & mongoose.Document

@Schema({timestamps: true})
export class Size {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    display_name: string

    @Prop({required: true})
    description: string

    @Prop([String])
    size_list: string[]
}

export const SizeSchema = SchemaFactory.createForClass(Size) 