import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Prodi{
  @Prop({required:true, String })
  name:string;

  @Prop({required:true, String })
  jurusan:string;

  @Prop({required:true, String })
  jenjang:string;

  @Prop({required:true , default:true})
  isActive:boolean;
}

export const ProdiSchema = SchemaFactory.createForClass(Prodi);