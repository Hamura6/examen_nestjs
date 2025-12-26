import { Module } from '@nestjs/common';
import { SerieService } from './series.service';
import { SerieController} from './series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './serie.entity';
@Module({
  providers: [SerieService],
  controllers: [SerieController],
  imports:[TypeOrmModule.forFeature([Serie])],
  exports:[TypeOrmModule]
})
export class SeriesModule {}
