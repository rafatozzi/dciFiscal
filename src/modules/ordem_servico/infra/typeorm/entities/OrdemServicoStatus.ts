import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Status } from "../../../../status/infra/typeorm/entities/Status";
import { OrdemServico } from "./OrdemServico";

@Entity("order_servico_status")
export class OrdemServicoStatus {
  @PrimaryColumn()
  id: string;

  @Column()
  id_ordem_servico: string;

  @Column()
  id_status: string;

  @ManyToOne(() => OrdemServico)
  @JoinColumn({ name: "id_ordem_servico" })
  ordemServico: OrdemServico;

  @ManyToOne(() => Status)
  @JoinColumn({ name: "id_status" })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }
}