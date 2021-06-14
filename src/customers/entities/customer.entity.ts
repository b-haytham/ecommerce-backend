import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type CustomerDocument = Customer & mongoose.Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
