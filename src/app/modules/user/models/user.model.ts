import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
   @Prop({ type: String, required: true, index: true })
   uuid: string;   
   
   @Prop({ type: String, required: true, unique: true })
   cpfCnpj: string;   
   
   @Prop({ type: String, required: true })
   name: string;   
   
   @Prop({ type: String, required: true })
   address: string;   
   
   @Prop({ type: String, required: true })
   phone: string;

   @Prop({ type: String, required: true, unique: true })
   email: string;

   @Prop({ type: String, required: true })
   birthdate: string;

   @Prop({ type: String, default: null, unique: true })
   crp: string | null;

   @Prop({ type: Number, default: null, unique: true })
   pacientId: number | null;

   @Prop({ type: String, required: true })
   password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);