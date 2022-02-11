import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Servicos } from "../../../../servicos/infra/typeorm/entities/Servicos";
import { OrdemServico } from "./OrdemServico";

@Entity("ordem_servico_servicos")
export class OrdemServicoServicos {
  @PrimaryColumn()
  id: string;

  @Column()
  id_ordem_servico: string;

  @Column()
  id_servico: string;

  @Column()
  quantidade: number;

  @Column()
  valor_unit: number;

  @ManyToOne(() => OrdemServico, i => i.servicos)
  @JoinColumn({ name: "id_ordem_servico" })
  ordemServico: OrdemServico;

  @ManyToOne(() => Servicos)
  @JoinColumn({ name: "id_servico" })
  servico: Servicos;

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