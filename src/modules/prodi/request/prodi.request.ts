import { IsNotEmpty, IsString, isNotEmpty, isString } from "class-validator";

export class CreateProdiRequest{
  @IsNotEmpty()
  @IsString()
    name: string;

  @IsNotEmpty()
  @IsString()
    jurusan:string;

  @IsNotEmpty()
  @IsString()
    jenjang:string; 
}

export class UpdateProdiRequest extends CreateProdiRequest{}