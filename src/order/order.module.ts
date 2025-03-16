import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { Announcement, AnnouncementSchema } from '../announcement/entities/announcement.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
      { name: Announcement.name, schema: AnnouncementSchema }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
