import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "../../../../accounts/infra/typeorm/entities/Users";
import { Clientes } from "../../../../clientes/infra/typeorm/entities/Clientes";
import { Empresas } from "../../../../empresas/infra/typeorm/entities/Empresas";
import { Status } from "../../../../status/infra/typeorm/entities/Status";
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
  id_empresa: string;

  @Column()
  id_cliente: string;

  @Column()
  id_user: string;

  @Column()
  id_status: string;

  @Column()
  descricao: string;

  @Column()
  previsao: Date;

  @Column()
  excluir: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Empresas)
  @JoinColumn({ name: "id_empresa" })
  empresa: Empresas;

  @ManyToOne(() => Clientes)
  @JoinColumn({ name: "id_cliente" })
  cliente: Clientes;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "id_user" })
  usuario: Users;

  @ManyToOne(() => Status)
  @JoinColumn({ name: "id_status" })
  ult_status: Status;

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