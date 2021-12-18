import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Pedidos } from "./Pedidos";

@Entity("pedidos_pgtos")
export class PedidosPgtos {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Pedidos)
  @JoinColumn({ name: "id_pedidos" })
  pedido: Pedidos;

  @Column()
  id_pedidos: string;

  @Column()
  forma_pgto: number;

  @Column()
  valor: number;

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