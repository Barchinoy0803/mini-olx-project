import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from "bcrypt"
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Region } from 'src/region/entities/region.entity';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Region.name) private regionModel: Model<Region>,
    private readonly jwtService: JwtService
  ) { }

  async findByEmail(email: string) {
    try {
      let user = await this.userModel.findOne({ email })
      return user
    } catch (error) {
      console.log(error.message);
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      let { email, password } = createUserDto
      let user = await this.findByEmail(email)
      if (user) return new HttpException("Already exists", HttpStatus.ALREADY_REPORTED)
      let hashPassword = bcrypt.hashSync(password, 10)
      let newUser = { ...createUserDto, password: hashPassword }
      let createdUser = await this.userModel.create(newUser)
      await this.regionModel.findByIdAndUpdate(createUserDto.regionId, {
        $push: { users: { $each: [createdUser._id] } }
      })
      return createdUser
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      let { email, password } = loginUserDto
      let user: any = await this.findByEmail(email)
      if (!user) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      let matchPassword = await bcrypt.compare(password, user.password)
      if (!matchPassword) return new HttpException("Wrong credentials", HttpStatus.BAD_REQUEST)
      let token = this.jwtService.sign({ id: user._id })
      return { token }
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(query: FilterUserDto) {
    try {
      const { page = 1, limit = 10, ...filters } = query;

      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const filter = Object.entries(filters).reduce((obj, [key, value]) => {
        if (value !== undefined && value !== '' && key !== 'location' && key !== 'shopName') {
          obj[key] = value;
        }
        return obj;
      }, {} as any);

      if (query.location) {
        filter.location = { $regex: query.location, $options: 'i' };
      }

      if (query.shopName) {
        filter.shopName = { $regex: query.shopName, $options: 'i' };
      }

      const totalUsers = await this.userModel.countDocuments(filter);

      const users = await this.userModel
        .find(filter)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .exec();

      if (!users.length) throw new HttpException("Not found", HttpStatus.NOT_FOUND);

      return {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limitNumber),
        currentPage: pageNumber,
        users,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findOne(id: string) {
    try {
      let user = await this.userModel.findById(id).populate('regionId').exec()
      if (!user) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return user
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let updated = await this.userModel.findByIdAndUpdate(id, updateUserDto)
      return updated
    } catch (error) {
      console.log(error.message);
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.userModel.findByIdAndDelete(id)
      return deleted
    } catch (error) {
      console.log(error.message);
    }
  }
}
