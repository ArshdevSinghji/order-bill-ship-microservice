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
  address: string;

  @Column({ type: 'jsonb' })
  product: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
