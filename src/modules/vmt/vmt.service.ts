import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vmt } from 'src/schema/vmt.schema';
import { VmtAttributes } from 'src/utils/enum/vmt-attributes.enum';

@Injectable()
export class VmtService {
  constructor(
    @InjectModel(Vmt.name)
    private readonly vmtModel: Model<Vmt>,
  ) {}

  async findOneOrCreate(prodiId: string): Promise<Vmt> {
    const defaultValues: Partial<Vmt> = {
      visiPolban: 'Silahkan tambahkan deskripsi ',
      misiPolban: [],
      tujuanPolban: [],
      visiJurusan: 'Silahkan tambahkan deskripsi ',
      misiJurusan: [],
      visiKeilmuanProgramStudi: 'Silahkan tambahkan deskripsi ',
    };

    const existingDocument = await this.vmtModel.findOne({ prodiId });

    if (existingDocument) {
      return existingDocument;
    }

    const newDocument = new this.vmtModel({
      prodiId,
      ...defaultValues,
    });

    return newDocument.save();
  }

  async upsertAttribute(
    prodiId: string,
    attribute: VmtAttributes, 
    value: any, 
  ): Promise<Vmt> {
    const defaultValues: Partial<Vmt> = {
      visiPolban: 'Silahkan tambahkan deskripsi ',
      misiPolban: [],
      tujuanPolban: [],
      visiJurusan: 'Silahkan tambahkan deskripsi ',
      misiJurusan: [],
      visiKeilmuanProgramStudi: 'Silahkan tambahkan deskripsi ',
    };

    // Construct update data, ensuring default values are only used if necessary
    const updateData: any = {
      $set: { [attribute]: value }, // Update the specified attribute
    };

    // For missing fields, use default values only if the document is new
    Object.keys(defaultValues).forEach((key) => {
      if (!updateData.$set[key]) {
        updateData.$setOnInsert = updateData.$setOnInsert || {};
        updateData.$setOnInsert[key] = defaultValues[key];
      }
    });

    // Perform upsert operation
    return this.vmtModel.findOneAndUpdate(
      { prodiId },
      updateData,
      { upsert: true, new: true },
    );
  }
}
