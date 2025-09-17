import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('billings')
export class Billing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  order_id: string;

  @Column({ type: 'uuid' })
  billing_account_id: string;

  @Column()
  billing_address: string;
}
