import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Color } from './entities/color.entity';
import { Model } from 'mongoose';

@Injectable()
export class ColorService {
  constructor(@InjectModel(Color.name) private colorModel: Model<Color>) {}

  async create(createColorDto: CreateColorDto) {
    try {
      return await this.colorModel.create(createColorDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const totalColors = await this.colorModel.countDocuments();

      const colors = await this.colorModel
        .find()
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .exec();

      if (!colors.length) throw new HttpException("Not found", HttpStatus.NOT_FOUND);

      return {
        totalPages: Math.ceil(totalColors / limitNumber),
        currentPage: pageNumber,
        colors,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const color = await this.colorModel.findById(id);
      if (!color) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
      return color;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    try {
      const updated = await this.colorModel.findByIdAndUpdate(id, updateColorDto, { new: true });
      if (!updated) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
      return updated;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.colorModel.findByIdAndDelete(id);
      if (!deleted) throw new HttpException("Not found", HttpStatus.NOT_FOUND);
      return deleted;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
