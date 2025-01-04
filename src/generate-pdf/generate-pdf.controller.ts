import { Controller, Post, Res, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { GeneratePdfService } from './generate-pdf.service';
import * as fs from 'fs';
import { SetPdfResponse } from '../common/functions/pdf-response';
import { GeneratePdfDTO } from './dto/generate-pdf.dto';
import { htmlToPdf } from '../common/functions/html-to-pdf';
import { callMediaApiToUpload } from '../common/functions/media-upload';

@Controller('generate-pdf')
export class GeneratePdfController {
  constructor(
    private readonly GeneratePdfService: GeneratePdfService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async htmlToPdf(@Res() res, @Body() body: GeneratePdfDTO,) {
    const filePath = `./views/${body.project}/${body.template}.html`.toLowerCase();
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ response: "File not found! check project name or template name" });
    }
    const fileContent = await this.GeneratePdfService.readFile(filePath)
    const htmlString = await this.GeneratePdfService.populateTemplate(fileContent, body, res)
    if (!htmlString) {
      return;
    }
    const buffer = await htmlToPdf(htmlString)

    if (body.isUpload) {
      const response = await callMediaApiToUpload(buffer, body)
      return res.set({}).json({ data: response.data });
    }
    else {
      SetPdfResponse(res, buffer)
    }
  }

}
