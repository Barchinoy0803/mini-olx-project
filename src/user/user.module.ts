import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv"
import { Region, RegionSchema } from 'src/region/entities/region.entity';
dotenv.config()

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Region.name, schema: RegionSchema }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '50m' }
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [JwtModule]
})
export class UserModule { }
