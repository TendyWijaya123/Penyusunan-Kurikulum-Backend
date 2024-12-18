import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BenchCurriculumService } from './bc.service';
import { CreateBenchCurriculumRequest, deleteManyRequest, UpdateManyBCRequest } from './request/bc.request';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/modules/shared/guards/roles.guard';
import { ROLES } from 'src/utils/constants/role.constant';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { User } from 'src/utils/decorator/user.decorator';

@ApiTags('bench-curriculums')
@UseGuards(AuthGuard('auth'), RoleGuard, )
@ApiBearerAuth()
@Controller('bc')
export class BenchCurriculumController {
  constructor(private readonly service:BenchCurriculumService){}

  @Get('/get-all')
  @Roles(ROLES.p2mpp, ROLES.wd1)
  async getAll(){
    const model= await this.service.findAll();
    return model;
  }

  @Get('all-by-prodi')
  @Roles(ROLES.prodi, ROLES.p2mpp)
  async getAllByProdi(@User("prodiId") prodiId:string){
    const model= await this.service.findAllByProdi(prodiId);
    return model;
  }

  @Roles(ROLES.prodi)
  @Post("create-bench-curriculum")
  async create(@Body() body:CreateBenchCurriculumRequest, @User("prodiId") prodiId:string){
    const model= await this.service.createBc(body, prodiId);
    return model;
  }

  @Roles(ROLES.prodi, ROLES.p2mpp)
  @HttpCode(204)
  @Patch("update-BC")
  async updateMany(@Body() body:UpdateManyBCRequest){
    await this.service.updateBCMany(body);
  }

  @HttpCode(204)
  @Roles(ROLES.prodi, ROLES.p2mpp)
  @Delete("/delete/:id")
  async delete(@Param("id") id: string ){
    await this.service.deleteBC(id);
  }

  @HttpCode(204)
  @Roles(ROLES.prodi, ROLES.p2mpp)
  @Delete("/delete-many")
  async deleteMany(@Body() ids: deleteManyRequest[] ){
    await this.service.deleteMany(ids);
  }

}
