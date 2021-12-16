import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ProdutosVariantes } from "./ProdutosVariantes";

@Entity("produtos")
export class Produtos {

  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  cod_barras: string;

  @Column()
  ncm: string;

  @Column()
  cfop: number;

  @Column()
  unid_med: string;

  @Column()
  preco: number;

  @OneToMany(() => ProdutosVariantes, v => v.produto)
  variantes: ProdutosVariantes[];

  @Column()
  excluir: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }

}