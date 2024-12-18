import { Module } from '@nestjs/common';
import { IpteksController } from './ipteks.controller';
import { IpteksService } from './ipteks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ipteks, IpteksSchema } from 'src/schema/ipteks.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ipteks.name, schema: IpteksSchema }])],
  controllers: [IpteksController],
  providers: [IpteksService],
})
export class IpteksModule {}
