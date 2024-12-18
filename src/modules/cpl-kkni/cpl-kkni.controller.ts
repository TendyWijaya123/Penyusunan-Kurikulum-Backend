import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../shared/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CplKkniService } from './cpl-kkni.service';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ROLES } from 'src/utils/constants/role.constant';
import { CreatedCplKkniRequest, UpdateCplKkniRequest } from './request/cpl-kkni.request';
import { User } from 'src/utils/decorator/user.decorator';

@Controller('cpl-kkni')
@UseGuards(AuthGuard('auth'), RoleGuard, )
@ApiBearerAuth()
@ApiTags('cpl-kkni')
export class CplKkniController {
 constructor( private readonly service:CplKkniService){}

 @Get()
  @Roles(ROLES.p2mpp, ROLES.wd1)
  async getAll(){
    const model= await this.service.findAll()
    return model;
  }

  @Get('all-by-prodi')
  @Roles(ROLES.prodi, ROLES.p2mpp)
  async getAllByProdi(@User("prodiId") prodiId:string){
    const model= await this.service.findAllByProdi(prodiId);
    return model;
  }

  @Roles(ROLES.prodi)
  @Post()
  async create(@Body() body:CreatedCplKkniRequest, @User("prodiId") prodiId:string){
    const model= await this.service.createCplKkni(body, prodiId);
    return model;
  }

  @Roles(ROLES.prodi, ROLES.p2mpp)
  @HttpCode(204)
  @Patch(":id")
  async updateCplKkni(@Param('id') id:string, @Body() body:UpdateCplKkniRequest){
    await this.service.updateCplKKni(body,id);
  }

  @Roles(ROLES.prodi)
  @HttpCode(204)
  @Delete(":id")
  async deleteCplKkkni(@Param('id') id:string){
    await this.service.deleteCplKkni(id);
  }

}
