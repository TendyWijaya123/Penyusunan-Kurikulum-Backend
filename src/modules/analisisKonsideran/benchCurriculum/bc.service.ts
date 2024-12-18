import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BenchCurriculum } from 'src/schema/bc.schema';
import { CreateBenchCurriculumRequest, deleteManyRequest, UpdateManyBCRequest } from './request/bc.request';

@Injectable()
export class BenchCurriculumService {
  constructor(@InjectModel(BenchCurriculum.name) private benchCurriculum:Model<BenchCurriculum>){}


  async findAll(): Promise<BenchCurriculum[]> {
    return this.benchCurriculum.find().exec();
  }

  async findAllByProdi(prodiId : string){
    return await this.benchCurriculum.find({prodi_id: prodiId});
  }

  async createBc(createProdi:CreateBenchCurriculumRequest, prodiId: string){
    const createdProdi= new this.benchCurriculum({...createProdi, prodi_id:prodiId});
    return createdProdi.save();
  }

  async createBCurriculums(createProdis:CreateBenchCurriculumRequest[]){
    const createdProdis= this.benchCurriculum.insertMany(createProdis);
    return createdProdis;
  }

  async updateBC(updateProdi:CreateBenchCurriculumRequest, id:string){
    await this.benchCurriculum.updateOne({_id:id},updateProdi);
  }

  async updateBCMany(updatedSksus: UpdateManyBCRequest) {
      const { updates } = updatedSksus;
    
      const bulkOps = updates.map((updateData) => ({
        updateOne: {
          filter: { _id: updateData._id },
          update: {
            $set: {
              prodi: updateData.prodi,
              region: updateData.region,
              city: updateData.city,
              category: updateData.category,
              CPL: updateData.CPL
            },
          },
          upsert: false, 
        },
      }));
    
      if (bulkOps.length > 0) {
        await this.benchCurriculum.bulkWrite(bulkOps);
      }
    }

  async deleteBC(id:string){
    await this.benchCurriculum.deleteOne({_id:id});
  }

  async deleteMany(ids:deleteManyRequest[]){
    await this.benchCurriculum.deleteMany({_id: { $in: ids }});
  }
}
