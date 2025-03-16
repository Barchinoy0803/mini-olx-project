import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ example: 'Red', description: 'Color name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: ['65f1111aaaa5678ef9'], description: 'List of announcement IDs', required: false })
  @IsString({ each: true })
  announcements?: string[];
}
