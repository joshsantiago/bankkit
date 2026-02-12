import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'from_account_id', nullable: true })
  fromAccountId: string;

  @Column({ name: 'to_account_id', nullable: true })
  toAccountId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ name: 'transaction_type', type: 'enum', enum: ['transfer', 'deposit', 'withdrawal'] })
  transactionType: string;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'completed' })
  status: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Account, account => account.sentTransactions)
  @JoinColumn({ name: 'from_account_id' })
  fromAccount: Account;

  @ManyToOne(() => Account, account => account.receivedTransactions)
  @JoinColumn({ name: 'to_account_id' })
  toAccount: Account;
}
