import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Clientes } from "../../../../clientes/infra/typeorm/entities/Clientes";
import { Empresas } from "../../../../empresas/infra/typeorm/entities/Empresas";
import { NfePgtos } from "./NfePgtos";
import { NfeProdutos } from "./NfeProdutos";
import { NfeXml } from "./NfeXml";

@Entity("nfe")
export class Nfe {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Empresas)
  @JoinColumn({ name: "id_empresa" })
  empresa: Empresas;

  @ManyToOne(() => Clientes)
  @JoinColumn({ name: "id_cliente" })
  cliente: Clientes;

  @OneToMany(() => NfeProdutos, p => p.nfe)
  pedidos: NfeProdutos[];

  @OneToMany(() => NfePgtos, p => p.nfe)
  pgtos: NfePgtos[];

  @OneToMany(() => NfeXml, p => p.nfe)
  list_xml: NfeXml[];

  @Column()
  id_empresa: string;

  @Column()
  id_cliente: string;

  @Column()
  total: number;

  @Column()
  desconto: number;

  @Column()
  nr_nfe: number;

  @Column()
  recibo: string;

  @Column()
  chave: string;

  @Column()
  status: number;

  @Column()
  situacao: string;

  @Column()
  motivo: string;

  @Column()
  cancelado: boolean;

  @Column()
  cancel_motivo: string;

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