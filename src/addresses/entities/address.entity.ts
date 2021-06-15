import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongooose  from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';

export type AddressDocument = Address & mongooose.Document;

@Schema({timestamps: true})
export class Address {
  @Prop({type: mongooose.Schema.Types.ObjectId, ref: 'Customer'})
  customer: Customer

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip_code: number;

  @Prop()
  phone_number: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
