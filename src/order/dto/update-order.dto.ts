import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({ example: '1234567890', description: 'User ID' })
  userId?: string;

  @ApiPropertyOptional({ example: '0987654321', description: 'Announcement ID' })
  announcementId?: string;

  @ApiPropertyOptional({ example: 2, description: 'Order count' })
  count?: number;
}
