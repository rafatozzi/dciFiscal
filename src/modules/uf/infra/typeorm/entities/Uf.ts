import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("uf")
export class Uf {

  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  uf: string;

  @Column()
  ibge: number;

}