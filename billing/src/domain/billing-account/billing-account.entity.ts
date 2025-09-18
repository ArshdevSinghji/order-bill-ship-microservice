import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('billing_accounts')
export class BillingAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @Column()
  card_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  updateBalance(amount: number) {
    const currentBalance = Number(this.balance);
    const newBalance = currentBalance - amount;
    this.balance = Number(newBalance.toFixed(2));
  }

  refundBalance(amount: number) {
    const currentBalance = Number(this.balance);
    const newBalance = currentBalance + amount;

    this.balance = Number(newBalance.toFixed(2));
  }
}
