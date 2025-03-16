import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '1234567890', description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '0987654321', description: 'Announcement ID' })
  @IsString()
  @IsNotEmpty()
  announcementId: string;

  @ApiProperty({ example: 2, description: 'Order count' })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
