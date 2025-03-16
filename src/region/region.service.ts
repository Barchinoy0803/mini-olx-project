import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './entities/region.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<Region>
  ) { }

  async create(createRegionDto: CreateRegionDto) {
    try {
      let region = await this.regionModel.create(createRegionDto)
      return region
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const totalRegions = await this.regionModel.countDocuments()

      let regions = await this.regionModel
        .find()
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .exec()

      if (!regions.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)

      return {
        totalRegions,
        totalPages: Math.ceil(totalRegions / limitNumber),
        currentPage: pageNumber,
        regions,

      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let region = await this.regionModel.findById(id)
      if (!region) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return region
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      let updated = await this.regionModel.findByIdAndUpdate(id, updateRegionDto, { new: true });

      if (!updated) throw new Error("Region not found.");
      return updated;
    } catch (error) {
      console.error("Update error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  async remove(id: string) {
    try {
      let deleted = await this.regionModel.findByIdAndDelete(id)
      return deleted
    } catch (error) {
      console.log(error.message);
    }
  }
}
