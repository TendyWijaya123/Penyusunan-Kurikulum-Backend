import { Body, Controller, Param, Patch, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../shared/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { VmtService } from './vmt.service';
import { VmtAttributes } from 'src/utils/enum/vmt-attributes.enum';
import { User } from 'src/utils/decorator/user.decorator';
import { Vmt } from 'src/schema/vmt.schema';

@Controller('vmt')
@UseGuards(AuthGuard('auth'), RoleGuard, )
@ApiBearerAuth()
export class VmtController {
  constructor(private readonly vmtService: VmtService) {}

  @Get()
  async findOneOrCreate(@User('prodiId') prodiId: string): Promise<Vmt> {
    return this.vmtService.findOneOrCreate(prodiId);
  }

  @Patch('visi-polban')
  async updateVisiPolban(
    @Body('value') value: string,
    @User("prodiId") prodiId:string
  ) {
    return this.vmtService.upsertAttribute(prodiId, VmtAttributes.visiPolban, value);
  }

  @Patch('misi-polban')
  async updateMisiPolban(
    @Body('value') value: string[],
    @User("prodiId") prodiId:string
  ) {
    return this.vmtService.upsertAttribute(prodiId, VmtAttributes.misiPolban, value);
  }

  @Patch('tujuan-polban')
  async updateTujuanPolban(
    @Body('value') value: string[],
    @User("prodiId") prodiId:string
    
  ) {
    return this.vmtService.upsertAttribute(prodiId, VmtAttributes.tujuanPolban, value);
  }

  @Patch('visi-jurusan')
  async updateVisiJurusan(
    @Body('value') value: string[],
    @User("prodiId") prodiId:string
  ) {
    return this.vmtService.upsertAttribute(prodiId, VmtAttributes.visiJurusan, value);
  }

  @Patch('misi-jurusan')
  async updateMisiJurusan(
    @Body('value') value: string[],
    @User("prodiId") prodiId:string
  ) {
    return this.vmtService.upsertAttribute(prodiId, VmtAttributes.misiJurusan, value);
  }

  @Patch('visi-keilmuan-program-studi')
  async updateVisiKeilmuanProgramStudi(
    @Body('value') value: string,
    @User("prodiId") prodiId:string
  ) {
    return this.vmtService.upsertAttribute(prodiId, VmtAttributes.visiKeilmuanProgramStudi, value);
  }
}
