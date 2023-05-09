import {Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {ProductCategory} from "../../../../shared-ts/src/lib/product-category.enum";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ProductCategory,
    nullable: false
  })
  category: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  owner: User;

}
