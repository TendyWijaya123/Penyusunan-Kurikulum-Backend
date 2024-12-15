import { Module } from '@nestjs/common';
import { ProdiController } from './prodi.controller';
import { ProdiService } from './prodi.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Prodi, ProdiSchema } from 'src/schema/prodi.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Prodi.name, schema:ProdiSchema}])],
  controllers: [ProdiController],
  providers: [ProdiService]
})
export class ProdiModule {}
