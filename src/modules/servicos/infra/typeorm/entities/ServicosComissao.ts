import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "../../../../accounts/infra/typeorm/entities/Users";
import { Servicos } from "./Servicos";

@Entity("servicos_comissao")
export class ServicosComissao {

  @PrimaryColumn()
  id: string;

  @Column()
  id_servico: string;

  @Column()
  id_user: string;

  @ManyToOne(() => Servicos, p => p.comissao)
  @JoinColumn({ name: "id_servico" })
  servico: Servicos;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "id_user" })
  usuario: Users;

  @Column()
  comissao: number;

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