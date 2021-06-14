import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from './UserRoles';

export type UserDocument = User & Document;
@Schema({
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
    },
  },
})
export class User {
  @Prop({ default: null })
  first_name: string;

  @Prop({ default: null })
  last_name: string;

  @Prop({ default: null })
  user_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({default: false})
  is_verified: boolean

  @Prop({ enum: UserRoles, required: true })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
