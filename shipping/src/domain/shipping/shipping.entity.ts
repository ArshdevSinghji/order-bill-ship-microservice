import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface Product {
  product_id: string;
  quantity: number;
}

@Entity('shippings')
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  order_id: string;

  @Column({ type: 'varchar', length: 255 })
  billing_address: string;

  @Column({ type: 'jsonb' })
  products: Product[];

  @Column({ type: 'boolean', default: false })
  is_placed: boolean;

  @Column({ type: 'boolean', default: false })
  is_billed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  placeOrder() {
    this.is_placed = true;
  }

  billOrder() {
    this.is_billed = true;
  }
}
