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

/*
01 - Dinheiro
02 - Cheque
03 - Cartão de Crédito
04 - Cartão de Débito
05 - Crédito Loja
10 - Vale Alimentação
11 - Vale Refeição
12 - Vale Presente
13 - Vale Combustível
14 - Duplicata Mercantil
15 - Boleto Bancário
90 - Sem Pagamento
99 - Outros
*/