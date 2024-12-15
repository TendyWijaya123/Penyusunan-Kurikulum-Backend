import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sksu } from 'src/schema/sksu.schema';
import { CreateSksuRequest, UpdateManySksuRequest } from './request/sksu.request';

@Injectable()
export class SksuService {
  constructor(@InjectModel(Sksu.name) private  sksuModel:Model<Sksu>){}

  async findAll(): Promise<Sksu[]> {
    return this.sksuModel.find();
  }

  async findAllByProdi(prodiId:string){
    return this.sksuModel.find({prodiId:prodiId});
  }

  async createSksu(createSksu:CreateSksuRequest, prodiId:string){
    const createdSksu= new this.sksuModel({...createSksu, prodiId:prodiId});
    return createdSksu.save();
  }

  async updateSksus(updatedSksus: UpdateManySksuRequest) {
    const { updates } = updatedSksus;
  
    const bulkOps = updates.map((updateData) => ({
      updateOne: {
        filter: { _id: updateData.id },
        update: {
          $set: {
            profilLulusan: updateData.profilLulusan,
            kualifikasi: updateData.kualifikasi,
            kategori: updateData.kategori,
            kompetensiKerja: updateData.kompetensiKerja,
          },
        },
        upsert: false, 
      },
    }));
  
    if (bulkOps.length > 0) {
      await this.sksuModel.bulkWrite(bulkOps);
    }
  }
  
}
