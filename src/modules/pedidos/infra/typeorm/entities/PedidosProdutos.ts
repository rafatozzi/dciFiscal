import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Produtos } from "../../../../produtos/infra/typeorm/entities/Produtos";
import { Pedidos } from "./Pedidos";

@Entity("pedidos_produtos")
export class PedidosProdutos {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Pedidos)
  @JoinColumn({ name: "id_pedidos" })
  pedido: Pedidos;

  @ManyToOne(() => Produtos)
  @JoinColumn({ name: "id_produto" })
  produto: Produtos;

  @Column()
  id_pedidos: string;

  @Column()
  id_produto: string;

  @Column()
  qtd: number;

  @Column()
  valor_unit: number;

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