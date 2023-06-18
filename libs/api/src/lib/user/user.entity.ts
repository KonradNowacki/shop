import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Role } from './role.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  emailActivationCode: string;

  @Exclude()
  @Column({ default: false })
  isActive: boolean;

  @OneToMany(
    () => Product,
    product => product.owner,
    { nullable: true })
  @JoinColumn()
  products: Product[];

  @ManyToMany(
    () => Role,
    r => r.user,
    { nullable: true, cascade: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @AfterInsert()
  private afterInsert() {
    // TODO KN Add logs - move to subscriber ??
  }

  @AfterUpdate()
  private afterUpdate() {
    // TODO KN Add logs - move to subscriber ??
  }

  @AfterRemove()
  private adterRemove() {
    // TODO KN Add logs - move to subscriber ??
  }
}
