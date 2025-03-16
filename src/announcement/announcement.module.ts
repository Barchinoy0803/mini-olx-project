import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Announcement, AnnouncementSchema } from './entities/announcement.entity';
import { Category, CategorySchema } from 'src/category/entities/category.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Color, ColorSchema } from 'src/color/entities/color.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
      { name: Color.name, schema: ColorSchema }
    ])
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule { }
