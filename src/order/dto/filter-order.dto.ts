import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterOrderDto {
  @ApiPropertyOptional({ example: '1234567890', description: 'User ID' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: '0987654321', description: 'Announcement ID' })
  @IsString()
  @IsOptional()
  announcementId?: string;

  @ApiPropertyOptional({ example: 2, description: 'Order count' })
  @IsNumber()
  @IsOptional()
  count?: number;

  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Items per page' })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
