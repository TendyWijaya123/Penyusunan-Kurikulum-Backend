import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/schema/role.shema';

@Module({
  imports:[MongooseModule.forFeature([{name:Role.name, schema:RoleSchema}])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
