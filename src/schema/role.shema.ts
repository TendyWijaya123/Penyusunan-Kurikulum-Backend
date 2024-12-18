import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'roles' }) 
export class Role{

  @Prop({String, unique:true})
  name:string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

