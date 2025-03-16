import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      let category = await this.categoryModel.create(createCategoryDto)
      return category
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      let pageNumber = Number(page)
      let limitNumber = Number(limit)

      const totalCategories = await this.categoryModel.countDocuments()

      let categories = await this.categoryModel
        .find()
        .skip((pageNumber - 1) * limit)
        .limit(limit)

      if (!categories.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)

      return {
        totalCategories,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCategories / limitNumber),
        categories
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let category = await this.categoryModel.findById(id)
      if (!category) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return category
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      let updated = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true })
      if (!updated) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return updated
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.categoryModel.findByIdAndDelete(id)
      return deleted
    } catch (error) {
      console.log(error.message);
    }
  }
}
