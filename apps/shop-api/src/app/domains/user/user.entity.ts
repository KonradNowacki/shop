import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {EmailString} from "@shop/shared-ts";
import {Product} from "../product/product.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  emailActivationCode: string

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(
    type => Product, product => product.owner,
    { nullable: true }
  )
  @JoinColumn()
  products: Product[];



  @AfterInsert()
  private afterInsert() {
    // TODO KN Add logs - move to subscriber ??
  }

  @AfterUpdate()
  private afterUpdate () {
    // TODO KN Add logs - move to subscriber ??
  }

  @AfterRemove()
  private adterRemove () {
    // TODO KN Add logs - move to subscriber ??
  }

}
