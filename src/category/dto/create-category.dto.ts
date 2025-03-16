import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Electronics', description: 'Category name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Category image URL' })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ example: [], description: 'List of announcements in this category', required: false })
    announcements?: string[];
}
