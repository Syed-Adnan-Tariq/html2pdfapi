import { Test, TestingModule } from '@nestjs/testing';
import { HtmltopdfController } from './htmltopdf.controller';
import { HtmltopdfService } from './htmltopdf.service';

describe('HtmltopdfController', () => {
  let controller: HtmltopdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HtmltopdfService],
      controllers: [HtmltopdfController],
    }).compile();

    controller = module.get<HtmltopdfController>(HtmltopdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
