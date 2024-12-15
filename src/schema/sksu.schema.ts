import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { KATEGORI_SKSU_ENUM } from "src/utils/enum/kategory-sksu.enum";
import { Schema as MongooseSchema } from 'mongoose';



@Schema()
export class Sksu{
  @Prop({ required:true, type: MongooseSchema.Types.ObjectId, ref: 'Prodi' })
  prodiId:string;

  @Prop({required:true, type:String})
  profilLulusan:string;

  @Prop({required:true, type:String})
  kualifikasi:string;

  @Prop({ required:true, type:String, enum:KATEGORI_SKSU_ENUM})
  kategori:KATEGORI_SKSU_ENUM;

  @Prop({required:true, type:[String]})
  kompetensiKerja:string[];
}

export const SksuSchema = SchemaFactory.createForClass(Sksu);
