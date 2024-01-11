import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Variantes } from "./Variantes";

@Entity("variantes_valores")
export class VariantesValores {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Variantes, variante => variante.variante_valores)
  @JoinColumn({ name: "id_variante" })
  variante: Variantes;

  @Column()
  id_variante: string;

  @Column()
  nome: string;

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