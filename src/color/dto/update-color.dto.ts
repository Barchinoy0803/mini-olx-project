import { PartialType } from '@nestjs/mapped-types';
import { CreateColorDto } from './create-color.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateColorDto extends PartialType(CreateColorDto) {
  @ApiProperty({ example: 'Blue', description: 'Updated color name', required: false })
  name?: string;

  @ApiProperty({ example: ['65f2222bbbb6789f0'], description: 'Updated list of announcement IDs', required: false })
  announcements?: string[];
}
