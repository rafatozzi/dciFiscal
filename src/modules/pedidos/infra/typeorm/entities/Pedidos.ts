import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Cidades } from "../../../../cidades/infra/typeorm/entities/Cidades";
import { Clientes } from "../../../../clientes/infra/typeorm/entities/Clientes";
import { Empresas } from "../../../../empresas/infra/typeorm/entities/Empresas";
import { PedidosPgtos } from "./PedidosPgtos";
import { PedidosProdutos } from "./PedidosProdutos";

@Entity("pedidos")
export class Pedidos {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Empresas)
  @JoinColumn({ name: "id_empresa" })
  empresa: Empresas;

  @ManyToOne(() => Clientes)
  @JoinColumn({ name: "id_cliente" })
  cliente: Clientes;

  @OneToMany(() => PedidosProdutos, p => p.pedido)
  pedidos: PedidosProdutos[];

  @OneToMany(() => PedidosPgtos, p => p.pedido)
  pgtos: PedidosPgtos[];

  @ManyToOne(() => Cidades)
  @JoinColumn({ name: "id_cidades" })
  cidade: Cidades;

  @Column()
  id_cidades: number;

  @Column()
  id_empresa: string;

  @Column()
  id_cliente: string;

  @Column()
  total: number;

  @Column()
  desconto: number;

  @Column()
  valor_pago: number;

  @Column()
  endereco: string;

  @Column()
  numero: number;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @Column()
  local_venda: string;

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