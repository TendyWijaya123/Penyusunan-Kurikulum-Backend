import { Body, Controller, Get, HttpCode, Patch, Post, UseGuards, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IpteksService } from './ipteks.service';
import { CreateIpteksRequest, UpdateManyIpteksRequest, UpdateIpteksRequest, DeleteIpteksRequest } from './request/ipteks.request';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../shared/guards/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ROLES } from 'src/utils/constants/role.constant';
import { User } from 'src/utils/decorator/user.decorator';

@Controller('ipteks')
@UseGuards(AuthGuard('auth'), RoleGuard)
@ApiBearerAuth()
@ApiTags('ipteks')
export class IpteksController {
  constructor(private readonly service: IpteksService) {}

  @Get()
  @Roles(ROLES.p2mpp, ROLES.wd1)
  async getAll() {
    return this.service.findAll();
  }

  @Get('all-by-prodi')
  @Roles(ROLES.prodi, ROLES.p2mpp)
  async getAllByProdi(@User('prodiId') prodiId: string) {
    return this.service.findAllByProdi(prodiId);
  }

  @Post()
  @Roles(ROLES.prodi)
  async create(@Body() body: CreateIpteksRequest, @User('prodiId') prodiId: string) {
    return this.service.createIpteks(body, prodiId);
  }

  @Patch()
  @Roles(ROLES.prodi, ROLES.p2mpp)
  @HttpCode(204)
  async update(@Body() body: UpdateIpteksRequest) {
    console.log(body);
    return this.service.updateIpteks(body);
  }

  @Delete(":id")
  @Roles(ROLES.prodi, ROLES.p2mpp)
  @HttpCode(204)
  async delete(@Param("id") id: string) {
    return this.service.deleteIpteks(id);
  }
}
