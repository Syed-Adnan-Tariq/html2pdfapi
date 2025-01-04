import { IsOptional, IsString, IsNumber, IsNotEmpty, ValidateIf } from 'class-validator';

export class GeneratePdfDTO {
  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsNotEmpty()
  template: string;

  @IsOptional()
  @IsNumber()
  expiryTime: number;
  
  @IsOptional()
  isUpload: boolean = false;

  @ValidateIf(o => o.isUpload === true)
  @IsNotEmpty()
  @IsString()
  pdfName: string;

  data: {}
}
