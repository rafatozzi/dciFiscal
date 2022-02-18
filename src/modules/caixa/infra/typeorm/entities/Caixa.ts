import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("caixa")
export class Caixa {

  @PrimaryColumn()
  id: string;

  @Column()
  valor_inicial: number;

  @Column()
  dinheiro: number;

  @Column()
  cartao_credito: number;

  @Column()
  cartao_debito: number;

  @Column()
  fechado: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }

}