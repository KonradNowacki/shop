import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RolesEnum} from "@shop/common-utils";
import {User} from "./user.entity";

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    nullable: false
  })
  role: string;

  @ManyToMany(() => User)
  user: User;
}
