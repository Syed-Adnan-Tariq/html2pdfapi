import { IsOptional, IsString, IsNumber, IsNotEmpty, ValidateIf } from 'class-validator';

export class HtmlToPdfDTO {
  @IsString()
  @IsNotEmpty()
  htmlString: string;

  @IsOptional()
  @IsNumber()
  expiryTime: number;
  
  @IsOptional()
  isUpload: boolean = false;

  @ValidateIf(o => o.isUpload === true)
  @IsNotEmpty()
  @IsString()
  pdfName: string;
}
