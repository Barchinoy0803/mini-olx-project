import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ example: 'Updated comment text', description: 'Updated comment text', required: false })
  text?: string;

  @ApiProperty({ example: 4, description: 'Updated star rating', required: false })
  star?: number;
}
