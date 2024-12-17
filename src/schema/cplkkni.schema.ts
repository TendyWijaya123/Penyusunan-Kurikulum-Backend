import { BadRequestException } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';


@Schema()
export class CplKkni{
  @Prop({ required:true, type: MongooseSchema.Types.ObjectId, ref: 'Prodi' })
  prodiId:string;

  @Prop({required:true, String, match: /^CPL-\d+$/ })
  kode:string;

  @Prop({required:true, String })
  deskripsi:string;
}

export const CplKkniSchema = SchemaFactory.createForClass(CplKkni);

CplKkniSchema.index({ kode: 1, prodiId: 1 }, { unique: true });

CplKkniSchema.post('save', function (error: any, doc: any, next: Function) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    throw new BadRequestException(`Kode telah digunakan`);
  }
});