import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Order {
    @Prop()
    userId: string

    @Prop()
    announcementId: string

    @Prop()
    count: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)
