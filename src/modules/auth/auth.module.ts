import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/constants/jwt.constant';
import { AuthStrategy } from 'src/modules/auth/strategy/auth.strategy';
import { Role, RoleSchema } from 'src/schema/role.shema';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema},{name:Role.name, schema:RoleSchema}]),
  JwtModule.register({
    global:true,
    secret:jwtConstants.secret,
    signOptions:{ expiresIn:'1h'},
  })],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
