import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleRequest{


  @IsNotEmpty()
  @IsString()
  name:string;
}


export class UpdateRoleRequest extends CreateRoleRequest {}