import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreatedCplKkniRequest{
  @IsNotEmpty()
  @IsString()
  @Matches(/^CPL-\d+$/, { message: 'Kode harus memiliki format CPL-<angka>, misalnya CPL-1' })
  kode:string;

  @IsNotEmpty()
  @IsString()
  deskripsi:string;

  
}

export class UpdateCplKkniRequest extends CreatedCplKkniRequest{}