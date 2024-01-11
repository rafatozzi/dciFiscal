import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Variantes } from "../../../../variantes/infra/typeorm/entities/Variantes";
import { VariantesValores } from "../../../../variantes/infra/typeorm/entities/VariantesValores";
import { Produtos } from "./Produtos";


@Entity("produtos_variantes")
export class ProdutosVariantes {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Produtos, p => p.variantes)
  @JoinColumn({ name: "id_produtos" })
  produto: Produtos;

  @ManyToOne(() => Variantes)
  @JoinColumn({ name: "id_variante" })
  variante: Variantes;

  @ManyToOne(() => VariantesValores)
  @JoinColumn({ name: "id_variante_valores" })
  variante_valor: VariantesValores;

  @Column()
  id_produtos: string;

  @Column()
  id_variante: string;

  @Column()
  id_variante_valores: string;

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