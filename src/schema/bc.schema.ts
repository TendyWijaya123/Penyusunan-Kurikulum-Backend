import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';
import { KATEGORI_BC_ENUM } from "src/utils/enum/category-bc.enum";

@Schema()
export class BenchCurriculum{
  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Prodi' })
  prodi_id:string;

  @Prop({required:true, String })
  prodi:string;

  @Prop({required:true, String})
  region: string;

  @Prop({required:true, String})
  city: string;

  @Prop({required:true, type:String, enum: KATEGORI_BC_ENUM })
  category:KATEGORI_BC_ENUM;

  @Prop({required:true, type:[String]})
  CPL:string[];
}

export const BenchCurriculumSchema = SchemaFactory.createForClass(BenchCurriculum);