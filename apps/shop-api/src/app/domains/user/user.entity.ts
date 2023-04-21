import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
