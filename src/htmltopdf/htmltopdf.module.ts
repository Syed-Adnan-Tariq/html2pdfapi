import { Module } from '@nestjs/common';
import { HtmltopdfController } from './htmltopdf.controller';
import { HtmltopdfService } from './htmltopdf.service';

@Module({
    imports: [],
    providers: [HtmltopdfService],
    controllers: [HtmltopdfController], 
})
export class HtmltopdfModule {}
