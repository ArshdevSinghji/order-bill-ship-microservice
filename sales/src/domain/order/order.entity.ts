import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './enum/order-status.enum';

interface Product {
  product_id: string;
  quantity: number;
}

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  products: Product[];

  @Column({ type: 'uuid' })
  customer_id: string;

  @Column({ type: 'decimal' })
  total_amount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  public markAsPending() {
    this.status = OrderStatus.PENDING;
  }

  public markAsPlaced() {
    this.status = OrderStatus.PLACED;
  }

  public markAsBilled() {
    this.status = OrderStatus.BILLED;
  }

  public markAsPaymentFailed() {
    this.status = OrderStatus.PAYMENT_FAILED;
  }

  public markAsReadyToShip() {
    this.status = OrderStatus.READY_TO_SHIP;
  }

  public markAsCancelled() {
    this.status = OrderStatus.CANCELLED;
  }
}
