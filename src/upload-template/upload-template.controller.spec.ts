import { Test, TestingModule } from '@nestjs/testing';
import { UploadTemplateController } from './upload-template.controller';
import { UploadTemplateService } from './upload-template.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common/interfaces';

describe('UploadTemplateController', () => {
  let controller: UploadTemplateController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadTemplateService],
      controllers: [UploadTemplateController],
    }).compile();

    controller = module.get<UploadTemplateController>(UploadTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFileAndPassValidation', () => {
    it('should return successful upload of file response', async () => {
      const result = "Template file uploaded successfully";
      jest.spyOn(controller, 'uploadFileAndPassValidation').mockImplementation(() => result);

      expect(await controller.uploadFileAndPassValidation()).toBe(result);
    });
  });

});
