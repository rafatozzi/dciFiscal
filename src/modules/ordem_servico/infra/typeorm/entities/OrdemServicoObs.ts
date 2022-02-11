import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { OrdemServico } from "./OrdemServico";

@Entity("ordem_servico_obs")
export class OrdemServicoObs {

  @PrimaryColumn()
  id: string;

  @Column()
  id_ordem_servico: string;

  @ManyToOne(() => OrdemServico, i => i.observacoes)
  @JoinColumn({ name: "id_ordem_servico" })
  ordemServico: OrdemServico;

  @Column()
  observacao: string;

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