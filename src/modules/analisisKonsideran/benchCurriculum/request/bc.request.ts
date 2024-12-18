import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsEnum, ValidateNested } from "class-validator";
import { KATEGORI_BC_ENUM } from "src/utils/enum/category-bc.enum";

export class CreateBenchCurriculumRequest {
  @IsNotEmpty()
  @IsString()
  prodi: string;

  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsEnum(KATEGORI_BC_ENUM)
  category: KATEGORI_BC_ENUM;

  @IsArray()
  @IsString({ each: true })
  CPL: string[];
}

export class updateBcRequest extends CreateBenchCurriculumRequest{
  @IsString()
  @IsNotEmpty()
  _id: string;
}

export class UpdateManyBCRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => updateBcRequest) 
  updates: updateBcRequest[];
}

export class deleteManyRequest {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
