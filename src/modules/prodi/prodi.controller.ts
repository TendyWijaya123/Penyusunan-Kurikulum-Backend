import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProdiRequest, UpdateProdiRequest } from './request/prodi.dto';
import { ProdiService } from './prodi.service';

@ApiTags('prodis')
@Controller('prodi')
export class ProdiController {
  constructor(private readonly service:ProdiService){}

  @Get()
  async getAll(){
    const model= await this.service.findAll();
    return model;
  }

  @Post()
  async createProdi(@Body() body:CreateProdiRequest){
    const model= await this.service.createProdi(body);
    return model;
  }

  @Post('bulkwrite')
  async createProdis(@Body() body:CreateProdiRequest[]){
    const model = await this.service.createProdis(body);
    return model;
  }

  @HttpCode(204)
  @Patch(":prodiId")
  async updateProdi(@Param('prodiId') prodiId:string , @Body() body:UpdateProdiRequest){
    await this.service.updateProdi(body, prodiId);
  }

}
