import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Produtos } from "../../../../produtos/infra/typeorm/entities/Produtos";
import { OrdemServico } from "./OrdemServico";

@Entity("ordem_servico_produtos")
export class OrdemServicoProdutos {
  @PrimaryColumn()
  id: string;

  @Column()
  id_ordem_servico: string;

  @Column()
  id_produto: string;

  @Column()
  quantidade: number;

  @Column()
  valor_unit: number;

  @ManyToOne(() => OrdemServico, i => i.produtos)
  @JoinColumn({ name: "id_ordem_servico" })
  ordemServico: OrdemServico;

  @ManyToOne(() => Produtos)
  @JoinColumn({ name: "id_produto" })
  produto: Produtos;

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