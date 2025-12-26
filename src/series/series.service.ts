import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './serie.entity';
import { CreateSerieDto } from './dto/create-serie.dto/create-serie.dto'; 
import { UpdateSerieDto } from './dto/update-serie.dto/update-serie.dto';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private serieRepository: Repository<Serie>,
  ) {}

  async create(createSerieDto: CreateSerieDto) {
    const serie = this.serieRepository.create(createSerieDto);
    return this.serieRepository.save(serie);
  }

  findAll() {
    return this.serieRepository.find({ relations: ['episodios'] });
  }

  async findOne(id: number) {
    const serie = await this.serieRepository.findOne({ where: { id }, relations: ['episodios'] });
    if (!serie) throw new NotFoundException('Serie no encontrada');
    return serie;
  }

  async update(id: number, updateSerieDto: UpdateSerieDto) {
    await this.serieRepository.update(id, updateSerieDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const serie = await this.findOne(id);
    return this.serieRepository.remove(serie);
  }
}
