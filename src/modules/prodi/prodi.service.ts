import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prodi } from 'src/schema/prodi.schema';
import { CreateProdiRequest, UpdateProdiRequest } from './request/prodi.request';
import { create } from 'domain';

@Injectable()
export class ProdiService {
  constructor(@InjectModel(Prodi.name) private prodiModel:Model<Prodi>){}


  async findAll(): Promise<Prodi[]> {
    return this.prodiModel.find().exec();
  }

  async createProdi(createProdi:CreateProdiRequest){
    const createdProdi= new this.prodiModel(createProdi);
    return createdProdi.save();
  }

  async createProdis(createProdis:CreateProdiRequest[]){
    const createdProdis= this.prodiModel.insertMany(createProdis);
    return createdProdis;
  }

  async updateProdi(updateProdi:UpdateProdiRequest, id:string){
    await this.prodiModel.updateOne({_id:id},updateProdi);
  }

  async deleteProdi(id:string){
    await this.prodiModel.deleteOne({_id:id});
  }

  async deleteProdis(ids:string[]){
    await this.prodiModel.deleteMany({_id: { $in: ids }});
  }
}
