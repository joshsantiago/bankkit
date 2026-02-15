import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  accountId?: string;

  @Column()
  name: string;

  @Column({ name: 'card_number' })
  cardNumber: string;

  @Column()
  expiry: string; // MM/YY

  @Column()
  cvv: string;

  @Column({ type: 'enum', enum: ['Visa', 'Mastercard', 'Amex', 'Discover'], default: 'Visa' })
  brand: string;

  @Column({ type: 'enum', enum: ['Debit', 'Credit'], default: 'Debit' })
  cardType: string;

  @Column({ default: false })
  isVirtual: boolean;

  @Column({ type: 'enum', enum: ['Active', 'Frozen', 'Cancelled', 'Expired'], default: 'Active' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 5000 })
  dailyLimit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 20000 })
  monthlyLimit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  currentSpending: number;

  @Column({ nullable: true })
  color?: string; // Hex color or Tailwind class

  @Column({ nullable: true })
  designUrl?: string; // Card design/image URL

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  account?: Account;
}
