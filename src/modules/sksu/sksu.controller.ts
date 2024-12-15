import { Body, Controller, Get, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SksuService } from './sksu.service';
import { CreateSksuRequest, UpdateManySksuRequest, UpdateSksuRequest } from './request/sksu.request';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../shared/guards/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ROLES } from 'src/utils/constants/role.constant';
import { User } from 'src/utils/decorator/user.decorator';

@Controller('sksu')
@UseGuards(AuthGuard('auth'), RoleGuard, )
@ApiBearerAuth()
@ApiTags('sksu')
export class SksuController {

  constructor( private readonly service:SksuService){}
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
  async create(@Body() body:CreateSksuRequest, @User("prodiId") prodiId:string){
    const model= await this.service.createSksu(body, prodiId);
    return model;
  }

  @Roles(ROLES.prodi, ROLES.p2mpp)
  @HttpCode(204)
  @Patch()
  async updateMany(@Body() body:UpdateManySksuRequest){
    await this.service.updateSksus(body);
  }

}
