import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ example: 'Updated Electronics', description: 'Updated category name', required: false })
    name?: string;

    @ApiProperty({ example: 'https://example.com/new-image.jpg', description: 'Updated category image URL', required: false })
    image?: string;
}
