import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { SerieService } from './series.service'; 
import { CreateSerieDto } from './dto/create-serie.dto/create-serie.dto'; 
import { UpdateSerieDto } from './dto/update-serie.dto/update-serie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('series')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }
  @Get()
  findAll() {
    return this.serieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.serieService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSerieDto: UpdateSerieDto) {
    return this.serieService.update(Number(id), updateSerieDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.serieService.remove(Number(id));
  }
}
