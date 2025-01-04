import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HtmltopdfModule } from './htmltopdf/htmltopdf.module';
import { GeneratePdfModule } from './generate-pdf/generate-pdf.module';
import { UploadTemplateModule } from './upload-template/upload-template.module';

@Module({
  imports: [HtmltopdfModule, GeneratePdfModule, UploadTemplateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
