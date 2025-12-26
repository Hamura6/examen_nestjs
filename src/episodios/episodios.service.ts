import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodio } from './episodio.entity';
import { CreateEpisodioDto } from './dto/create-episodio.dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto/update-episodio.dto';
import { Serie } from '../series/serie.entity';

@Injectable()
export class EpisodioService {
    constructor(
        @InjectRepository(Episodio)
        private episodioRepository: Repository<Episodio>,
        @InjectRepository(Serie)
        private serieRepository: Repository<Serie>,
    ) { }

    async create(createEpisodioDto: CreateEpisodioDto) {
        const { serieId, ...data } = createEpisodioDto;

        const serie = await this.serieRepository.findOne({ where: { id: serieId } });
        if (!serie) throw new NotFoundException('Serie no encontrada');

        const episodio = this.episodioRepository.create({
            ...data,
            serie,
        });
        return this.episodioRepository.save(episodio);
    }

    findAll() {
        return this.episodioRepository.find({ relations: ['serie'] });
    }

    async findOne(id: number) {
        const episodio = await this.episodioRepository.findOne({ where: { id }, relations: ['serie'] });
        if (!episodio) throw new NotFoundException('Episodio no encontrado');
        return episodio;
    }

    async update(id: number, updateEpisodioDto: UpdateEpisodioDto) {
        const episodio = await this.findOne(id);

        if (updateEpisodioDto.serieId) {  // <-- usar serieId
            const serie = await this.serieRepository.findOne({ where: { id: updateEpisodioDto.serieId } });
            if (!serie) throw new NotFoundException('Serie no encontrada');
            episodio.serie = serie;
        }

        Object.assign(episodio, updateEpisodioDto); // asigna los demás campos
        return this.episodioRepository.save(episodio);
    }


    async remove(id: number) {
        const episodio = await this.findOne(id);
        return this.episodioRepository.remove(episodio);
    }
}
