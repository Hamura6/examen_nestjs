import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EpisodioService } from './episodios.service'; 
import { CreateEpisodioDto } from './dto/create-episodio.dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto/update-episodio.dto';

@Controller('episodios')
export class EpisodioController {
  constructor(private readonly episodioService: EpisodioService) {}

  @Post()
  create(@Body() createEpisodioDto: CreateEpisodioDto) {
    return this.episodioService.create(createEpisodioDto);
  }

  @Get()
  findAll() {
    return this.episodioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.episodioService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEpisodioDto: UpdateEpisodioDto) {
    return this.episodioService.update(Number(id), updateEpisodioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.episodioService.remove(Number(id));
  }
}
