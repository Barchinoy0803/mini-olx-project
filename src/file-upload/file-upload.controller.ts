import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('File Upload')
@Controller('upload')
export class FileUploadController {
  
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file format' })
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          let filename = `${Date.now()}-${Math.random() * 8}${path.extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  UploadedFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }
}
