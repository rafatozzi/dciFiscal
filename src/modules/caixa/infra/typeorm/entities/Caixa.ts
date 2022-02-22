import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Financeiro } from "../../../../financeiro/infra/typeorm/entities/Financeiro";

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

  @OneToMany(() => Financeiro, i => i.caixa)
  financeiro: Financeiro[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }

}