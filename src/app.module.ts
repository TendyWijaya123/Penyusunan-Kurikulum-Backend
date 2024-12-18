import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProdiModule } from './modules/prodi/prodi.module';
import { SksuModule } from './modules/sksu/sksu.module';
import { IpteksModule } from './modules/ipteks/ipteks.module';
import { AnalisisKonsideranModule } from './modules/analisisKonsideran/ak.module';
import { CplKkniModule } from './modules/cpl-kkni/cpl-kkni.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/penyusunan_kurikulum'),
    ProdiModule,
    RoleModule,
    AuthModule,
    SksuModule,
    IpteksModule,
    AnalisisKonsideranModule,
    CplKkniModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
