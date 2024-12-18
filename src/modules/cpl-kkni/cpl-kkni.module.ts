import { Module } from '@nestjs/common';
import { CplKkniService } from './cpl-kkni.service';
import { CplKkniController } from './cpl-kkni.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CplKkni, CplKkniSchema } from 'src/schema/cplkkni.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:CplKkni.name, schema:CplKkniSchema}])],
  providers: [CplKkniService],
  controllers: [CplKkniController]
})
export class CplKkniModule {}
