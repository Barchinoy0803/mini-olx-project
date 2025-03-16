import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Announcement } from './entities/announcement.entity';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Color } from 'src/color/entities/color.entity';
import { FilterAnnouncementDto } from './dto/filter-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(Announcement.name) private announcementModel: Model<Announcement>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Color.name) private colorModel: Model<Color>
  ) { }

  async create(createAnnouncementDto: CreateAnnouncementDto, req: any) {
    try {
      let salerId = req.user
      let announcement = await this.announcementModel.create({ ...createAnnouncementDto, salerId })
      await this.categoryModel.findByIdAndUpdate(createAnnouncementDto.categoryId, {
        $push: { announcements: { $each: [announcement._id] } }
      })
      await this.userModel.findByIdAndUpdate(createAnnouncementDto.salerId, {
        $push: { announcements: { $each: [announcement._id] } }
      })
      await this.colorModel.findByIdAndUpdate(createAnnouncementDto.colorId, {
        $push: { announcements: { $each: [announcement._id] } }
      })
      return announcement
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(query: FilterAnnouncementDto) {
    try {
      const { page = 1, limit = 10, ...filters } = query

      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      const filter = Object.entries(filters).reduce((obj, [key, value]) => {
        if (value !== undefined && value !== '') {
          if (key === "guarantee") {
            obj[key] = value === "true";
          } else if (key !== "minPrice" && key !== "maxPrice") {
            obj[key] = value;
          }
        }
        return obj;
      }, {} as any);

      if (query.minPrice || query.maxPrice) {
        filter.price = {};
        if (query.minPrice) filter.price.$gte = Number(query.minPrice);
        if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
      }

      const totalAnnouncements = await this.announcementModel.countDocuments(filter)

      let announcements = await this.announcementModel
        .find(filter)
        .skip((pageNumber - 1) * limit)
        .limit(limit)
        .populate('categoryId')
        .populate('salerId')
        .populate('colorId');

      if (!announcements.length) throw new HttpException("Not found", HttpStatus.NOT_FOUND);

      return {
        totalAnnouncements,
        totalPages: Math.ceil(totalAnnouncements / limitNumber),
        currentPage: pageNumber,
        announcements
      };
    } catch (error) {
      console.log("Error:", error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findOne(id: string) {
    try {
      let announcement = await this.announcementModel.findById(id).populate('categoryId').populate('salerId').populate('colorId')
      if (!announcement) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return announcement
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    try {
      let updated = await this.announcementModel.findByIdAndUpdate(id, updateAnnouncementDto, { new: true })
      if (!updated) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return updated
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.announcementModel.findByIdAndDelete(id)
      return deleted
    } catch (error) {
      console.log(error.message);
    }
  }
}
