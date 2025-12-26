import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Episodio } from 'src/episodios/episodio.entity';
@Entity()
export class Serie{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    titulo:string;
    @Column()
    genero:string;

    @Column()
    sinopsis:string;
    
    @Column()
    urlPortada:string;

    @OneToMany(()=>Episodio, episodio=>episodio.serie)
    episodios:Episodio[];
}