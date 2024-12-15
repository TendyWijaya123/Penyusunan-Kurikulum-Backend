import { Module } from '@nestjs/common';
import { SksuController } from './sksu.controller';
import { SksuService } from './sksu.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sksu, SksuSchema } from 'src/schema/sksu.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Sksu.name, schema:SksuSchema}])],
  controllers: [SksuController],
  providers: [SksuService]
})
export class SksuModule {}
