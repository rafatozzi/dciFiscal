import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("ncm_aliquotas")
export class NcmAliquotas {

  @PrimaryColumn()
  id: string;

  @Column()
  ncm: string;

  @Column()
  tributo_nacional: number;

  @Column()
  tributo_estadual: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }

}