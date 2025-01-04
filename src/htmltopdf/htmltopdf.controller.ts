import { Controller, Post, Res, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { HtmltopdfService } from './htmltopdf.service';
import { SetPdfResponse } from '../common/functions/pdf-response';
import { HtmlToPdfDTO } from './dto/htmltopdf.dto';
import { htmlToPdf } from '../common/functions/html-to-pdf';
import { callMediaApiToUpload } from '../common/functions/media-upload';

@Controller('htmltopdf')
export class HtmltopdfController {
  constructor(private readonly htmltopdfService: HtmltopdfService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async htmlToPdf(@Res() res, @Body() body: HtmlToPdfDTO) {
    const buffer = await htmlToPdf(body.htmlString)
    if (body.isUpload == true) {
      const response = await callMediaApiToUpload(buffer, body)
      return res.set({}).json({ data: response.data });
    }
    else {
      SetPdfResponse(res, buffer)
    }
  }
}
