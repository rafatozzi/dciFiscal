import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ServicosCkeckList } from "./ServicosCkeckList";

@Entity("servicos")
export class Servicos {

  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  recorrente: boolean;

  @Column()
  recorrente_dias: number;

  @Column()
  valor: number;

  @Column()
  excluir: boolean;

  @OneToMany(() => ServicosCkeckList, v => v.servico)
  ckecklist: ServicosCkeckList[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }
}