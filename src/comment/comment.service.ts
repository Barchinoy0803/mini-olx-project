import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Announcement } from 'src/announcement/entities/announcement.entity';
import { FilterCommentDto } from './dto/filter-comment.dto';


@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Announcement.name) private announcementModel: Model<Announcement>
  ) { }

  async create(createCommentDto: CreateCommentDto, req: any) {
    try {
      let userId = req.user
      let comment = await this.commentModel.create({ ...createCommentDto, userId })
      await this.userModel.findByIdAndUpdate(createCommentDto.userId, {
        $push: { comments: { $each: [comment._id] } }
      })
      await this.announcementModel.findByIdAndUpdate(createCommentDto.announcementId, {
        $push: { comments: { $each: [comment._id] } }
      })
      return comment
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(query: FilterCommentDto) {
    try {
      const { page = 1, limit = 10, ...filters } = query

      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      const filter = Object.entries(filters).reduce((obj, [key, value]) => {
        if (value !== undefined && value !== '') {
          obj[key] = value
        }
        return obj
      }, {} as any)

      const totalComments = await this.commentModel.countDocuments(filter)

      let comments = await this.commentModel
        .find(filter)
        .skip((pageNumber - 1) * limit)
        .limit(limit)
        .populate('userId')
        .populate('announcementId')

      if (!comments.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)

      return {
        totalComments,
        totalPages: Math.ceil(totalComments / limitNumber),
        currentPage: pageNumber,
        comments
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let comment = await this.commentModel.findById(id).populate('userId').populate('announcementId')
      if (!comment) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return comment
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      let updated = await this.commentModel.findByIdAndUpdate(id, updateCommentDto)
      if (!updated) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return updated
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.commentModel.findByIdAndDelete(id)
      return deleted
    } catch (error) {
      console.log(error.message);
    }
  }
}
