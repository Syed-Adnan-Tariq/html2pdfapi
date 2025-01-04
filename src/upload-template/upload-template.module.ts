import { Module } from '@nestjs/common';
import { UploadTemplateController } from './upload-template.controller';
import { UploadTemplateService } from './upload-template.service';

@Module({
  controllers: [UploadTemplateController],
  providers: [UploadTemplateService]
})
export class UploadTemplateModule {}
