import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { FormaPgtoBand } from "./FormaPgtoBand";

@Entity("forma_pgto")
export class FormaPgto {

  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  max_parcelas: number;

  @Column()
  intervalo_parcelas: number;

  @Column()
  primeira_parcela_dias: number;

  @Column()
  tipo_recebimento: string;

  @OneToMany(() => FormaPgtoBand, v => v.formaPgto)
  bandeiras: FormaPgtoBand[];

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