import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { ANNOUNCEMENT_TYPE } from "../../types/types";

export class CreateAnnouncementDto {
    @ApiProperty({ example: 'iPhone 14', description: 'Announcement title' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Brand new iPhone 14, 128GB', description: 'Detailed description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 1200, description: 'Price of the product' })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Image URL' })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ example: 'SELL', enum: ANNOUNCEMENT_TYPE, description: 'Type of announcement' })
    @IsEnum(ANNOUNCEMENT_TYPE)
    type: ANNOUNCEMENT_TYPE;

    @ApiProperty({ example: true, description: 'Guarantee available or not' })
    @IsBoolean()
    @IsNotEmpty()
    guarantee: boolean;

    @ApiProperty({ example: 10, description: 'Discount percentage' })
    @IsNumber()
    @IsPositive()
    discount: number;

    @ApiProperty({ example: '65f1234abcd5678ef9', description: 'Color ID' })
    @IsString()
    @IsNotEmpty()
    colorId: string;

    @ApiProperty({ example: '65f9876dcba4321ef0', description: 'Seller ID' })
    @IsString()
    @IsNotEmpty()
    salerId: string;

    @ApiProperty({ example: '65f1111aaaa5678ef9', description: 'Category ID' })
    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @ApiProperty({ example: [], description: 'List of comments' })
    comments: string[];

    @ApiProperty({ example: [], description: 'List of orders' })
    orders: string[];
}
