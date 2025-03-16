import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterCommentDto {
  @ApiProperty({ example: '65f9876dcba4321ef0', description: 'Filter by Announcement ID', required: false })
  @IsString()
  @IsOptional()
  announcementId?: string;

  @ApiProperty({ example: 5, description: 'Filter by star rating', required: false })
  @IsNumber()
  @IsOptional()
  star?: number;

  @ApiProperty({ example: 1, description: 'Page number', required: false })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 10, description: 'Items per page', required: false })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
