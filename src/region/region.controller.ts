import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Region successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }
  
  @ApiResponse({ status: 200, description: 'List of regions' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.regionService.findAll(page, limit);
  }

  @ApiResponse({ status: 200, description: 'Region details' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Region successfully updated' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(id, updateRegionDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Region successfully deleted' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}
