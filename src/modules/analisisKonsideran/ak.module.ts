import { Module } from '@nestjs/common';
import { BenchCurriculumModule } from './benchCurriculum/bc.module';

@Module({
  imports:[BenchCurriculumModule],
})
export class AnalisisKonsideranModule {}