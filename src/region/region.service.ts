import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './entities/region.entity';
import { Model } from 'mongoose';

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

  async findAll() {
    try {
      let regions = await this.regionModel.find()
      if(!regions.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return regions
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let region = await this.regionModel.findById(id)
      if(!region) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return region
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      let updated = await this.regionModel.findByIdAndUpdate(id, updateRegionDto)
      return updated
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: string) {
    try {
      let deleted  = await this.regionModel.findByIdAndDelete(id)
      return deleted
    } catch (error) {
      console.log(error.message);
    }
  }
}
