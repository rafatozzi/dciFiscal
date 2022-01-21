import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("nfe_xml")
export class NfeXml {

  @PrimaryColumn()
  id: string;

  @Column()
  id_nfe: string;

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