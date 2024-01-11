import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Cidades } from "../../../../cidades/infra/typeorm/entities/Cidades";
import { v4 as uuidv4 } from "uuid";

@Entity("clientes")
export class Clientes {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Cidades)
  @JoinColumn({ name: "id_cidades" })
  cidade: Cidades;

  @Column()
  id_cidades: number;

  @Column()
  fantasia: string;

  @Column()
  razao_social: string;

  @Column()
  cpf_cnpj: number;

  @Column()
  rg_ie: number;

  @Column()
  email: string;

  @Column()
  telefone: number;

  @Column()
  celular: number;

  @Column()
  endereco: string;

  @Column()
  numero: number;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @Column()
  favorito: boolean;

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