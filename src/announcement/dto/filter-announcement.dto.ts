import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FilterAnnouncementDto {
    @ApiProperty({ example: '65f1111aaaa5678ef9', description: 'Category ID', required: false })
    @IsString()
    @IsOptional()
    categoryId?: string;

    @ApiProperty({ example: '65f9876dcba4321ef0', description: 'Seller ID', required: false })
    @IsString()
    @IsOptional()
    salerId?: string;

    @ApiProperty({ example: 100, description: 'Minimum price', required: false })
    @IsNumber()
    @IsOptional()
    minPrice?: number;

    @ApiProperty({ example: 1000, description: 'Maximum price', required: false })
    @IsNumber()
    @IsOptional()
    maxPrice?: number;

    @ApiProperty({ example: 1, description: 'Page number', required: false })
    @IsNumber()
    @IsOptional()
    page?: number;
    
    @ApiProperty({ example: 10, description: 'Items per page', required: false })
    @IsNumber()
    @IsOptional()
    limit?: number;
}
