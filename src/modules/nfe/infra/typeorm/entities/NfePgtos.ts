import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Nfe } from "./Nfe";

@Entity("nfe_pgtos")
export class NfePgtos {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Nfe)
  @JoinColumn({ name: "id_nfe" })
  nfe: Nfe;

  @Column()
  id_nfe: string;

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