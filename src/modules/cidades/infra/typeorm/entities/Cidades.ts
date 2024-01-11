import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Uf } from "../../../../uf/infra/typeorm/entities/Uf";

@Entity("cidades")
export class Cidades {

  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Uf)
  @JoinColumn({ name: "id_uf" })
  uf: Uf;

  @Column()
  id_uf: number;

  @Column()
  nome: string;

  @Column()
  ibge: number;

}