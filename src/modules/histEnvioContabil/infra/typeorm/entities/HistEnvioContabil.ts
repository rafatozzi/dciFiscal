import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Empresas } from "../../../../empresas/infra/typeorm/entities/Empresas";

@Entity("hist_envio_contabil")
export class HistEnvioContabil {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Empresas)
  @JoinColumn({ name: "id_empresa" })
  empresa: Empresas;

  @Column()
  id_empresa: string;

  @Column()
  mes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }
}