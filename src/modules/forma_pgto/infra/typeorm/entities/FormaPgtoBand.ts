import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { FormaPgto } from "./FormaPgto";
import { FormaPgtoBandTaxas } from "./FormaPgtoBandTaxas";

@Entity("forma_pgto_band")
export class FormaPgtoBand {

  @PrimaryColumn()
  id: string;

  @Column()
  id_forma_pgto: string;

  @ManyToOne(() => FormaPgto, p => p.bandeiras)
  @JoinColumn({ name: "id_forma_pgto" })
  formaPgto: FormaPgto;

  @Column()
  nome: string;

  @Column()
  taxa_recebimento: number;

  @Column()
  recebimento_dias: number;

  @OneToMany(() => FormaPgtoBandTaxas, v => v.bandeira)
  taxas: FormaPgtoBandTaxas[];

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