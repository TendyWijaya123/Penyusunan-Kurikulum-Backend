import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/schema/role.shema';
import { CreateRoleRequest, UpdateRoleRequest } from './request/role.request';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel:Model<Role>){}


  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async createRole(createRole:CreateRoleRequest){
    const createdRole= new this.roleModel(createRole);
    return createdRole.save();
  }

  async createRoles(createRoles:CreateRoleRequest[]){
    const createdRoles=this.roleModel.insertMany(createRoles);
    return createdRoles;
  }

  async updateRole(updateRole:UpdateRoleRequest, id:string){
    await this.roleModel.updateOne({_id:id},updateRole);
  }

  async deleteRole(id:string){
    await this.roleModel.deleteOne({_id:id});
  }

  async deleteRoles(ids:string[]){
    await this.roleModel.deleteMany({_id: { $in: ids }});
  }
}
