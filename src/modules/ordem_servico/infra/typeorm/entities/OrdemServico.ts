import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { OrdemServicoObs } from "./OrdemServicoObs";
import { OrdemServicoPgtos } from "./OrdemServicoPgtos";
import { OrdemServicoProdutos } from "./OrdemServicoProdutos";
import { OrdemServicoServicos } from "./OrdemServicoServicos";
import { OrdemServicoStatus } from "./OrdemServicoStatus";

@Entity("ordem_servico")
export class OrdemServico {
  @PrimaryColumn()
  id: string;

  @Column()
  id_cliente: string;

  @Column()
  id_user: string;

  @Column()
  descricao: string;

  @Column()
  excluir: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrdemServicoObs, i => i.ordemServico)
  observacoes: OrdemServicoObs[];

  @OneToMany(() => OrdemServicoPgtos, i => i.ordemServico)
  pgtos: OrdemServicoPgtos[];

  @OneToMany(() => OrdemServicoProdutos, i => i.ordemServico)
  produtos: OrdemServicoProdutos[];

  @OneToMany(() => OrdemServicoServicos, i => i.ordemServico)
  servicos: OrdemServicoServicos[];

  @OneToMany(() => OrdemServicoStatus, i => i.ordemServico)
  status: OrdemServicoStatus[];

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }

}