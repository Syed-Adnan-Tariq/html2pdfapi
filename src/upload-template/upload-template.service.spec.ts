import { Test, TestingModule } from '@nestjs/testing';
import { UploadTemplateService } from './upload-template.service';

describe('UploadTemplateService', () => {
  let service: UploadTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadTemplateService],
    }).compile();

    service = module.get<UploadTemplateService>(UploadTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
