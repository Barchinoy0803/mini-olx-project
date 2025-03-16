import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Announcement } from "../../announcement/entities/announcement.entity";

@Schema()
export class Color {
    @Prop()
    name: string

    @Prop()
    announcements: Announcement[]
}

export const ColorSchema = SchemaFactory.createForClass(Color)
