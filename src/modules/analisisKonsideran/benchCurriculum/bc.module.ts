import { Module } from '@nestjs/common';
import { BenchCurriculumService } from './bc.service';
import { MongooseModule } from'@nestjs/mongoose';
import { BenchCurriculum, BenchCurriculumSchema } from 'src/schema/bc.schema';
import { BenchCurriculumController } from './bc.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:BenchCurriculum.name, schema:BenchCurriculumSchema}])],
  controllers: [BenchCurriculumController],
  providers: [BenchCurriculumService]
})
export class BenchCurriculumModule {}
