import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateIpteksRequest {
  @IsNotEmpty()
  @IsString()
  ilmuPengetahuan: string;

  @IsNotEmpty()
  @IsString()
  teknologi: string;

  @IsNotEmpty()
  @IsString() 
  seni: string; 
}

export class UpdateManyIpteksRequest {
  updates: UpdateIpteksRequest[];
}

export class UpdateIpteksRequest {
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @IsString()
  ilmuPengetahuan: string;

  @IsNotEmpty()
  @IsString()
  teknologi: string;

  @IsNotEmpty()
  @IsString() 
  seni: string; 
}

export class DeleteIpteksRequest {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}


