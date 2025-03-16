import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilterAnnouncementDto } from './dto/filter-announcement.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';


@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) { }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiResponse({ status: 201, description: 'Announcement successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Request() req) {
    return this.announcementService.create(createAnnouncementDto, req);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of announcements' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category ID' })
  @ApiQuery({ name: 'salerId', required: false, description: 'Filter by seller ID' })
  @ApiQuery({ name: 'price', required: false, description: "Filter by price" })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum price filter' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price filter' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page for pagination' })
  findAll(@Query() query: FilterAnnouncementDto) {
    return this.announcementService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an announcement by ID' })
  @ApiResponse({ status: 200, description: 'Successful retrieval' })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update an announcement' })
  @ApiResponse({ status: 200, description: 'Announcement updated successfully' })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  update(@Param('id') id: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcementService.update(id, updateAnnouncementDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an announcement' })
  @ApiResponse({ status: 200, description: 'Announcement deleted successfully' })
  @ApiResponse({ status: 404, description: 'Announcement not found' })
  remove(@Param('id') id: string) {
    return this.announcementService.remove(id);
  }
}
