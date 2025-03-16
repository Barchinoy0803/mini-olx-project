import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'Category successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Categories not found.' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.categoryService.findAll(page, limit);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Category found.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Category updated successfully.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
