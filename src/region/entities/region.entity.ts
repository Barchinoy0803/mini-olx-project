import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../user/entities/user.entity";

@Schema()
export class Region {
    @Prop({ required: true })
    name: string

    @Prop()
    users: User[]
}

export const RegionSchema = SchemaFactory.createForClass(Region)
