import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleRequest, UpdateRoleRequest } from './request/role.dto';

@ApiTags('roles')
@Controller('role')
export class RoleController {
  constructor(private readonly service:RoleService){}

  @Get()
  async getAll(){
    const model= await this.service.findAll();
    return model;
  }

  @Post()
  async createRole(@Body() body:CreateRoleRequest){
    const model= await this.service.createRole(body);
    return model;
  }

  @Post('bulkwrite')
  async createRoles(@Body() body:CreateRoleRequest[]){
    const model = await this.service.createRoles(body);
    return model;
  }

  @HttpCode(204)
  @Patch(":roleId")
  async updateRole(@Param('roleId') roleId:string , @Body() body:UpdateRoleRequest){
    await this.service.updateRole(body, roleId);
  }
}
