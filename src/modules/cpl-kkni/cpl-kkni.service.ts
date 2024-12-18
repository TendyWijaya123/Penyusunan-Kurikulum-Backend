import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CplKkni } from 'src/schema/cplkkni.schema';
import { CreatedCplKkniRequest, UpdateCplKkniRequest } from './request/cpl-kkni.request';

@Injectable()
export class CplKkniService {
  constructor(@InjectModel(CplKkni.name) private cplKkniModel:Model<CplKkni>){}

  async findAll(): Promise<CplKkni[]> {
    return this.cplKkniModel.find();
  }
  
  async findAllByProdi(prodiId:string){
    return this.cplKkniModel.find({prodiId:prodiId});
  }

  async createCplKkni(createdCplKkniRequest:CreatedCplKkniRequest, prodiId:string){
    const createdCplKkni= new this.cplKkniModel({...createdCplKkniRequest, prodiId});
    return createdCplKkni.save();
  }

  async updateCplKKni(updateCplKkniRequest:UpdateCplKkniRequest, id:string){
    await this.cplKkniModel.updateOne({_id:id},updateCplKkniRequest);
  }

  async deleteCplKkni(id:string){
    await this.cplKkniModel.deleteOne({_id:id});
  }

  
}
