import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("cidades")
export class Cidades {

  @PrimaryColumn()
  id: number;


}