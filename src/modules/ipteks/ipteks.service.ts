import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ipteks } from 'src/schema/ipteks.schema';
import {
  CreateIpteksRequest,
  UpdateIpteksRequest,
  UpdateManyIpteksRequest,
} from './request/ipteks.request';

@Injectable()
export class IpteksService {
  constructor(@InjectModel(Ipteks.name) private readonly ipteksModel: Model<Ipteks>) {}

  // Fetch all data
  async findAll(): Promise<Ipteks[]> {
    return this.ipteksModel.find();
  }

  // Fetch data by Prodi ID
  async findAllByProdi(prodiId: string): Promise<Ipteks[]> {
    return this.ipteksModel.find({ prodiId });
  }

  // Create new data
  async createIpteks(createIpteks: CreateIpteksRequest, prodiId: string): Promise<Ipteks> {
    const createdIpteks = new this.ipteksModel({ ...createIpteks, prodiId });
    return createdIpteks.save();
  }

  // Update single Ipteks
  async updateIpteks(updateIpteks: UpdateIpteksRequest): Promise<void> {
    const { _id, ilmuPengetahuan, teknologi, seni } = updateIpteks;
    const updateData = {
      $set: {
        ilmuPengetahuan,
        teknologi,
        seni,
      },
    };
    await this.ipteksModel.updateOne({ _id }, updateData);
    console.log('Update completed for ID:', _id);
  }

  // Update multiple Ipteks
  async updateIptekss(updatedIptekss: UpdateManyIpteksRequest): Promise<void> {
    const bulkOps = updatedIptekss.updates.map((updateData) => ({
      updateOne: {
        filter: { _id: updateData._id },
        update: {
          $set: {
            ilmuPengetahuan: updateData.ilmuPengetahuan,
            teknologi: updateData.teknologi,
            seni: updateData.seni,
          },
        },
        upsert: false,
      },
    }));

    if (bulkOps.length > 0) {
      await this.ipteksModel.bulkWrite(bulkOps);
      console.log('Bulk update completed:', bulkOps.length, 'documents updated');
    } else {
      console.log('No updates to process');
    }
  }

async deleteIpteks(id: string): Promise<void> {
  const result = await this.ipteksModel.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new Error(`Ipteks with ID ${id} not found`);
  }
  console.log(`Deleted Ipteks with ID: ${id}`);
}

}
