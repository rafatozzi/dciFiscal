import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { FormaPgtoBand } from "./FormaPgtoBand";

@Entity("forma_pgto_band_taxas")
export class FormaPgtoBandTaxas {

  @PrimaryColumn()
  id: string;

  @Column()
  id_forma_pgto_band: string;

  @ManyToOne(() => FormaPgtoBand, p => p.taxas)
  @JoinColumn({ name: "id_forma_pgto_band" })
  bandeira: FormaPgtoBand;

  @Column()
  nr_parcela: number;

  @Column()
  porcentagem: number;

  @Column()
  taxa_adiantamento: number;

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