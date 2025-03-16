import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Announcement } from "src/announcement/entities/announcement.entity";
import { Order } from "src/order/entities/order.entity";
import { USER_TYPE } from "src/types/types";

@Schema()
export class User {
    @Prop()
    fullname: string

    @Prop()
    email: string

    @Prop()
    phone: string

    @Prop()
    password: string

    @Prop({ default: USER_TYPE.USER })
    type: USER_TYPE

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Region"})
    regionId: string

    @Prop()
    shopName: string

    @Prop()
    location: string

    @Prop()
    image: string

    @Prop()
    comments: Comment[]

    @Prop()
    announcements: Announcement[]

    @Prop()
    orders: Order[]
}

export const UserSchema = SchemaFactory.createForClass(User)
