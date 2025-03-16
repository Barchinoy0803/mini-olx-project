  import { Module } from '@nestjs/common';
  import { CommentService } from './comment.service';
  import { CommentController } from './comment.controller';
  import { MongooseModule } from '@nestjs/mongoose';
  import { Comment, CommentSchema } from './entities/comment.entity';
  import { User, UserSchema } from '../user/entities/user.entity';
  import { Announcement, AnnouncementSchema } from '../announcement/entities/announcement.entity';

  @Module({
    imports: [
      MongooseModule.forFeature([
        { name: Comment.name, schema: CommentSchema },
        { name: User.name, schema: UserSchema },
        { name: Announcement.name, schema: AnnouncementSchema }
      ])
    ],
    controllers: [CommentController],
    providers: [CommentService],
  })
  export class CommentModule { }
