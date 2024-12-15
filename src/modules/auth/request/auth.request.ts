import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequest{

  @IsNotEmpty()
  @IsString()
  username:string;

  @IsNotEmpty()
  @IsString()
  password:string;

  @IsNotEmpty()
  @IsString()
  email:string;

  @IsNotEmpty()
  @IsString()
  roleId:string;

  @IsNotEmpty()
  @IsString()
  prodiId:string;

  @IsNotEmpty()
  @IsString()
  roleTeam:string;
}

export class LoginRequest{
  @IsNotEmpty()
  @IsString()
  username:string;

  @IsNotEmpty()
  @IsString()
  password:string;
  
}