import { Controller, UseInterceptors, Post, UploadedFile, Res, HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { UploadTemplateService } from './upload-template.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import * as fs from 'fs';

@Controller('upload-template')
export class UploadTemplateController {
  constructor(private readonly uploadTemplateService: UploadTemplateService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (req?.headers?.project === undefined || req?.headers?.project === null || req?.headers?.project?.toString().trim() === "") {
          throw new Error('Invalid project name!');
        }
        const uploadPath = `./views/${req.headers.project}/`.toLowerCase();
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        cb(null, `${file.originalname.toLowerCase()}`)
      }
    }),
    limits: {
      fileSize: +process.env.MAX_FILE_SIZE || 10000000
    }
  }))
  uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'html',
        })
        .addMaxSizeValidator({
          maxSize: +process.env.MAX_FILE_SIZE || 10000000
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file?: Express.Multer.File,
    @Res() res?
  ) {
    return res?.status(HttpStatus.OK).json({ status: "success", response: "Template file uploaded successfully", data: file })
  }

}
