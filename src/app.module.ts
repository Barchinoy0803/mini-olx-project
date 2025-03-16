import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';
import { ColorModule } from './color/color.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const PASSWORD = process.env.DATABASE_PASSWORD

@Module({
  imports: [UserModule, AnnouncementModule, RegionModule, CategoryModule, ColorModule, OrderModule, CommentModule, FileUploadModule,
    MongooseModule.forRoot(`mongodb+srv://barchinoy08:${PASSWORD}@mini-olx.wei9h.mongodb.net/?retryWrites=true&w=majority&appName=mini-olx`),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/swagger'
    })  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}  
