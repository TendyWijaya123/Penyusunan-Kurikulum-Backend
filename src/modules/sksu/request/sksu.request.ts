import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested, isNotEmpty } from "class-validator";
import { KATEGORI_SKSU_ENUM } from "src/utils/enum/kategory-sksu.enum";

export class CreateSksuRequest{

  @IsString()
  @IsNotEmpty()
  profilLulusan:string;

  @IsString()
  @IsNotEmpty()
  kualifikasi:string;

  @IsEnum(KATEGORI_SKSU_ENUM)  
  @IsNotEmpty()
  kategori:KATEGORI_SKSU_ENUM;

  @IsArray()
  @IsString({ each: true })
  kompetensiKerja?:string[];
}

export class UpdateSksuRequest extends CreateSksuRequest{
  @IsString()
  @IsNotEmpty()
  _id: string;
}

export class UpdateManySksuRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSksuRequest) 
  updates: UpdateSksuRequest[];
}
