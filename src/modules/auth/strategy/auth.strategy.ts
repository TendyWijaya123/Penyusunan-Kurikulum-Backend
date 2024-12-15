import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "src/utils/constants/jwt.constant";
import { Role } from "src/schema/role.shema";


@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy,'auth'){
  constructor( @InjectModel(Role.name) private readonly roleModel: Model<Role>,){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey:jwtConstants.secret,
    })
  }

  async validate(payload:any){
    const role = await this.roleModel.findOne({ _id: payload.roleId });
    return {userId: payload.userId, username:payload.username, prodiId:payload.prodiId, role:role.name};
  }
}
