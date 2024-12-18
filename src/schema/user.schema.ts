import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'users' }) 
export class User{

  @Prop({required:true, unique:true, String})
  username:string;

  @Prop({required:true, String})
  email:string;

  @Prop({required:true, String})
  password:string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Prodi' })
  prodiId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  roleId: string;

  @Prop()
  roleTeam:string; 
}

export const UserSchema = SchemaFactory.createForClass(User);
