import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Great product!', description: 'Comment text' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 5, description: 'Star rating (1-5)' })
  @IsNumber()
  @IsNotEmpty()
  star: number;

  @ApiProperty({ example: '65f1111aaaa5678ef9', description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({ example: '65f9876dcba4321ef0', description: 'Announcement ID' })
  @IsString()
  announcementId: string;
}
