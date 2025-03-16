import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Announcement } from "src/announcement/entities/announcement.entity";

@Schema()
export class Category {
    @Prop()
    name: string

    @Prop()
    image: string

    @Prop()
    announcements: Announcement[]
}

export const CategorySchema = SchemaFactory.createForClass(Category) 
