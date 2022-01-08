import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Produtos } from "../../../../produtos/infra/typeorm/entities/Produtos";
import { Nfe } from "./Nfe";

@Entity("nfe_produtos")
export class NfeProdutos {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Nfe)
  @JoinColumn({ name: "id_nfe" })
  nfe: Nfe;

  @ManyToOne(() => Produtos)
  @JoinColumn({ name: "id_produto" })
  produto: Produtos;

  @Column()
  id_nfe: string;

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