import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserRequest, LoginRequest } from './request/auth.request';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/utils/decorator/user.decorator';
import { RoleGuard } from '../shared/guards/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ROLES } from 'src/utils/constants/role.constant';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor( private readonly service:AuthService){}

  @UseGuards(AuthGuard('auth'), RoleGuard)
  @Roles(ROLES.prodi)
  @Get()
  async getAll(@User("role") userId:string){
    const model= await this.service.findAll();
    return model;
  }

  @Post("login")
  async login(@Body() loginRequest:LoginRequest,@Req() request:Request){
    return this.service.signIn(loginRequest);
  }

  @Post("register")
  async register(@Body() body:CreateUserRequest){
    const model= await this.service.register(body);
  }




}
