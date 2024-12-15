import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { CreateUserRequest, LoginRequest } from './request/auth.request';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel:Model<User>, private jwtService:JwtService){}

  async findAll(){
    return await this.userModel.find().exec();
  }

  async register(createUser:CreateUserRequest){
    const findUser= await  this.userModel.findOne({username:createUser.username});

    if(!findUser){
      const hashPassword= await bcrypt.hash(createUser.password, 10);

      const newUser= this.userModel.create({
        username:createUser.username,
        password:hashPassword,
        email:createUser.email,
        roleId:createUser.roleId,
        prodiId:createUser.prodiId,
        roleTeam:createUser.roleTeam
      })

      return newUser;
    }
    throw new BadRequestException('Username already exists');
  }

  async signIn(loginRequest:LoginRequest){
    const user= await this.userModel.findOne({
      username:loginRequest.username
    });
    if(!user){
      throw new NotFoundException('User tidak ditemukan');
    }

    const isPassCorrect= await bcrypt.compare(loginRequest.password,user.password);
    if(!isPassCorrect){
      throw new UnauthorizedException('Password yang dimasukkan salah');
    }

    const payload={
      userId:user.id,
      username:user.username,
      prodiId:user.prodiId,
      roleId:user.roleId,
    }

    return {
      accessToken:await this.jwtService.signAsync(payload)
    };
  }

}
