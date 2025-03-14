import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
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
}

export const UserSchema = SchemaFactory.createForClass(User)
