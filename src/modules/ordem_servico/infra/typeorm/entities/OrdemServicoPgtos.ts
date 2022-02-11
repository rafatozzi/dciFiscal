import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { FormaPgto } from "../../../../forma_pgto/infra/typeorm/entities/FormaPgto";
import { OrdemServico } from "./OrdemServico";

@Entity("ordem_servico_pgtos")
export class OrdemServicoPgtos {
  @PrimaryColumn()
  id: string;

  @Column()
  id_ordem_servico: string;

  @Column()
  id_forma_pgto: string;

  @ManyToOne(() => OrdemServico, i => i.pgtos)
  @JoinColumn({ name: "id_ordem_servico" })
  ordemServico: OrdemServico;

  @ManyToOne(() => FormaPgto)
  @JoinColumn({ name: "id_forma_pgto" })
  formaPgto: FormaPgto;

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