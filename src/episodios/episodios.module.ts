import { Module } from '@nestjs/common';
import { EpisodioService } from './episodios.service'; 
import { EpisodioController } from './episodios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodio } from './episodio.entity';
import { SeriesModule } from 'src/series/series.module';

@Module({
  imports:[TypeOrmModule.forFeature([Episodio]),SeriesModule],
  providers: [EpisodioService],
  controllers: [EpisodioController],

})
export class EpisodiosModule {}
