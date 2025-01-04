import { Test, TestingModule } from '@nestjs/testing';
import { HtmltopdfService } from './htmltopdf.service';

describe('HtmltopdfService', () => {
  let service: HtmltopdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HtmltopdfService],
    }).compile();

    service = module.get<HtmltopdfService>(HtmltopdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
