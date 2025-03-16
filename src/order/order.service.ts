import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { Announcement } from '../announcement/entities/announcement.entity';
import { FilterOrderDto } from './dto/filter-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<Order>,
    @InjectModel(Announcement.name) private announcementModel: Model<Order>
  ) { }

  async create(createOrderDto: CreateOrderDto, req) {
    try {
      let userId = req.user
      let order = await this.orderModel.create({ ...createOrderDto, userId })
      await this.userModel.findByIdAndUpdate(createOrderDto.userId, {
        $push: { orders: { $each: [order._id] } }
      })
      await this.announcementModel.findByIdAndUpdate(createOrderDto.announcementId, {
        $push: { orders: { $each: [order._id] } }
      })
      return order
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll(query: FilterOrderDto) {
    try {
      const { page = 1, limit = 10, ...filters } = query

      const pageNumber = Number(page)
      const limitNumber = Number(limit)

      let filter = Object.entries(filters).reduce((obj, [key, value]) => {
        if (value !== undefined && value !== '') {
          obj[key] = value
        }
        return obj
      }, {} as any)

      const totalOrders = await this.orderModel.countDocuments(filter)

      let orders = await this.orderModel
        .find(filter)
        .skip((pageNumber - 1) * limit)
        .limit(limit)
        .populate('userId')
        .populate('announcementId')

      if (!orders.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)

      return {
        totalOrders,
        totalPages: Math.ceil(totalOrders / limitNumber),
        currentPage: pageNumber,
        orders
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let order = await this.orderModel.findById(id).populate('userId').populate('announcementId')
      if (!order) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return order
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let updated = await this.orderModel.findByIdAndUpdate(id, updateOrderDto)
      if (!updated) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return updated
    } catch (error) {
      console.log(error.message);
    }
  }

}
