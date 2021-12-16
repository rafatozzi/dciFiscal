import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { VariantesValores } from "./VariantesValores";

@Entity("variantes")
export class Variantes {

  @PrimaryColumn()
  id: string;

  @OneToMany(() => VariantesValores, valores => valores.variante)
  variante_valores: VariantesValores[];

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