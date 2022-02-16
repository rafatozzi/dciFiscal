import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Clientes } from "../../../../clientes/infra/typeorm/entities/Clientes";

@Entity("agendamento")
export class Agendamentos {

  @PrimaryColumn()
  id: string;

  @Column()
  id_cliente: string;

  @ManyToOne(() => Clientes)
  @JoinColumn({ name: "id_cliente" })
  cliente: Clientes;

  @Column()
  data_agendamento: Date;

  @Column()
  descricao: string;

  @Column()
  urgente: boolean;

  @Column()
  concluido: boolean;

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