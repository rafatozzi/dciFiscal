import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Nfe } from "./Nfe";

@Entity("nfe_xml")
export class NfeXml {

  @PrimaryColumn()
  id: string;

  @Column()
  id_nfe: string;

  @ManyToOne(() => Nfe)
  @JoinColumn({ name: "id_nfe" })
  nfe: Nfe;

  @Column()
  acao: string;

  @Column()
  xml: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }

}