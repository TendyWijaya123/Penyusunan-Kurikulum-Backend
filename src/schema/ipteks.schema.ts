import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Ipteks {
  @Prop({ required:true, type: MongooseSchema.Types.ObjectId, ref: 'Prodi' })
  prodiId:string;

  @Prop({ required: true, type: String })
  ilmuPengetahuan: string;

  @Prop({ required: true, type: String })
  teknologi: string;

  @Prop({ required: true, type: String }) 
  seni: string; 
}

export const IpteksSchema = SchemaFactory.createForClass(Ipteks);
