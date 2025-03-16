import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';

@Module({
  controllers: [FileUploadController],
  providers: [],
})
export class FileUploadModule {}
