import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Comment {
    @Prop({required: true})
    text: string

    @Prop()
    star: number

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    userId: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Announcement"})
    announcementId: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
