import { Module } from '@nestjs/common';
import { VmtService } from './vmt.service';
import { VmtController } from './vmt.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vmt, VmtSchema } from 'src/schema/vmt.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Vmt.name, schema:VmtSchema}])],
  providers: [VmtService],
  controllers: [VmtController]
})
export class VmtModule {}
