import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Order } from "src/order/entities/order.entity";
import { ANNOUNCEMENT_TYPE } from "src/types/types";

@Schema()
export class Announcement {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    price: number

    @Prop()
    image: string

    @Prop()
    type: ANNOUNCEMENT_TYPE

    @Prop()
    guarantee: boolean

    @Prop()
    discount: number

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Color"})
    colorId: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    salerId: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Category"})
    categoryId: string

    @Prop()
    comments: Comment[]

    @Prop()
    orders: Order[]
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement)
