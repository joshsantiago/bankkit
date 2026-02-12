import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'bankkit',
  entities: [User, Account, Transaction],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);
  const transactionRepository = AppDataSource.getRepository(Transaction);

  // Clear existing data
  await transactionRepository.delete({});
  await accountRepository.delete({});
  await userRepository.delete({});

  console.log('🗑️  Cleared existing data');

  // Create users
  const password = await bcrypt.hash('password123', 10);

  const admin = await userRepository.save(
    userRepository.create({
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'admin@bankkit.com',
      passwordHash: password,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      status: 'active',
    }),
  );

  const john = await userRepository.save(
    userRepository.create({
      id: '550e8400-e29b-41d4-a716-446655440002',
      email: 'john.doe@example.com',
      passwordHash: password,
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      status: 'active',
    }),
  );

  const jane = await userRepository.save(
    userRepository.create({
      id: '550e8400-e29b-41d4-a716-446655440003',
      email: 'jane.smith@example.com',
      passwordHash: password,
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'user',
      status: 'active',
    }),
  );

  console.log('✅ Created users');

  // Create accounts
  const johnChecking = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440001',
      userId: john.id,
      accountNumber: 'CHK1001234567',
      accountType: 'checking',
      balance: 5000.0,
      status: 'active',
    }),
  );

  const johnSavings = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440002',
      userId: john.id,
      accountNumber: 'SAV1001234567',
      accountType: 'savings',
      balance: 15000.0,
      status: 'active',
    }),
  );

  const janeChecking = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440003',
      userId: jane.id,
      accountNumber: 'CHK1007654321',
      accountType: 'checking',
      balance: 3200.5,
      status: 'active',
    }),
  );

  const janeSavings = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440004',
      userId: jane.id,
      accountNumber: 'SAV1007654321',
      accountType: 'savings',
      balance: 22500.75,
      status: 'active',
    }),
  );

  const adminChecking = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440005',
      userId: admin.id,
      accountNumber: 'CHK1009999999',
      accountType: 'checking',
      balance: 10000.0,
      status: 'active',
    }),
  );

  console.log('✅ Created accounts');

  // Create transactions
  await transactionRepository.save([
    transactionRepository.create({
      fromAccountId: johnSavings.id,
      toAccountId: johnChecking.id,
      amount: 500.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Transfer to checking account',
      createdAt: new Date('2024-01-15'),
    }),
    transactionRepository.create({
      fromAccountId: johnChecking.id,
      toAccountId: janeChecking.id,
      amount: 250.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Payment for dinner',
      createdAt: new Date('2024-01-16'),
    }),
    transactionRepository.create({
      fromAccountId: janeChecking.id,
      toAccountId: janeSavings.id,
      amount: 1000.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Monthly savings',
      createdAt: new Date('2024-01-17'),
    }),
    transactionRepository.create({
      fromAccountId: janeChecking.id,
      toAccountId: johnChecking.id,
      amount: 150.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Repayment',
      createdAt: new Date('2024-01-18'),
    }),
    transactionRepository.create({
      fromAccountId: johnChecking.id,
      toAccountId: johnSavings.id,
      amount: 300.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Savings deposit',
      createdAt: new Date('2024-01-20'),
    }),
  ]);

  console.log('✅ Created transactions');
  console.log('\n📋 Demo accounts:');
  console.log('   Admin: admin@bankkit.com / password123');
  console.log('   User 1: john.doe@example.com / password123');
  console.log('   User 2: jane.smith@example.com / password123');

  await AppDataSource.destroy();
}

seed()
  .then(() => {
    console.log('\n🎉 Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
