import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  @ApiResponse({ status: 201, description: 'Color created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'List of colors' })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.colorService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a color by ID' })
  @ApiResponse({ status: 200, description: 'Color found' })
  @ApiResponse({ status: 404, description: 'Color not found' })
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a color by ID' })
  @ApiResponse({ status: 200, description: 'Color updated successfully' })
  @ApiResponse({ status: 404, description: 'Color not found' })
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(id, updateColorDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a color by ID' })
  @ApiResponse({ status: 200, description: 'Color deleted successfully' })
  @ApiResponse({ status: 404, description: 'Color not found' })
  remove(@Param('id') id: string) {
    return this.colorService.remove(id);
  }
}
