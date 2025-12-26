import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Serie } from 'src/series/serie.entity';

@Entity()   
export class Episodio{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    titulo:string;

    @Column()
    duracion:string;

    @Column()
    numeroCapitulo:number;
    
    @ManyToOne(()=>Serie, serie=>serie.episodios,{onDelete:'CASCADE'})
    serie:Serie;
}