import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Servicos } from "./Servicos";

@Entity("servicos_ckecklist")
export class ServicosCkeckList {

  @PrimaryColumn()
  id: string;

  @Column()
  id_servico: string;

  @ManyToOne(() => Servicos, p => p.ckecklist)
  @JoinColumn({ name: "id_servico" })
  servico: Servicos;

  @Column()
  nome: string;

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