import { Expose } from "class-transformer";
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Cidades } from "../../../../cidades/infra/typeorm/entities/Cidades";

@Entity("empresas")
export class Empresas {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Cidades)
  @JoinColumn({ name: "id_cidades" })
  cidade: Cidades;

  @Column()
  id_cidades: number;

  @Column()
  razao: string;

  @Column()
  fantasia: string;

  @Column()
  cnpj: number;

  @Column()
  ie: number;

  @Column()
  crt: number;

  @Column()
  cep: number;

  @Column()
  fone: number;

  @Column()
  nr: number;

  @Column()
  bairro: string;

  @Column()
  complemento: string;

  @Column()
  endereco: string;

  @Column()
  nr_nfe: number;

  @Column()
  serie_nfe: number;

  @Column()
  ambiente: number;

  @Column()
  senha_cert: string;

  @Column()
  venc_cert: Date;

  @Expose({ name: "cert" })
  cert(): string {
    switch (process.env.DISK) {
      case "local":
        return `${process.env.APP_API_URL}/certificado/${this.id}.pfx`;

      default:
        return null;
    }
  };

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