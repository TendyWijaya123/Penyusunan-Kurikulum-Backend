import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Vmt {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Prodi' })
  prodiId: string;

  @Prop({ required: true, type: String })
  visiPolban: string;

  @Prop({ required: true, type: [String] })
  misiPolban: string[];

  @Prop({ required: true, type: [String] })
  tujuanPolban: string[];

  @Prop({ required: true, type: String })
  visiJurusan: string;

  @Prop({ required: true, type: [String] })
  misiJurusan: string[];

  @Prop({ required: true, type: String })
  visiKeilmuanProgramStudi: string;
}

export const VmtSchema = SchemaFactory.createForClass(Vmt);
