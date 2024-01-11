import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Caixa } from "../../../../caixa/infra/typeorm/entities/Caixa";
import { OrdemServicoPgtos } from "../../../../ordem_servico/infra/typeorm/entities/OrdemServicoPgtos";

@Entity("financeiro")
export class Financeiro {

  @PrimaryColumn()
  id: string;

  @Column()
  id_caixa: string;

  @Column()
  id_ordem_servico_pgtos: string;

  @ManyToOne(() => Caixa)
  @JoinColumn({ name: "id_caixa" })
  caixa: Caixa;

  @ManyToOne(() => OrdemServicoPgtos)
  @JoinColumn({ name: "id_ordem_servico_pgtos" })
  ordemServicoPgto: OrdemServicoPgtos;

  @Column()
  descricao: string;

  @Column()
  credito: number;

  @Column()
  debito: number;

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