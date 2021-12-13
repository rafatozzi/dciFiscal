import { Entity, Column, PrimaryColumn, CreateDateColumn, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./Users";

@Entity("users_tokens")
export class UserToken {

  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id)
      this.id = uuidv4();
  }

}