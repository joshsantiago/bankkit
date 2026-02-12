import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find({ order: { createdAt: 'DESC' } });
    return {
      success: true,
      data: users.map(({ passwordHash, ...user }) => user),
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const accounts = await this.accountRepository.find({ where: { userId: id } });
    const { passwordHash, ...sanitizedUser } = user;

    return {
      success: true,
      data: { ...sanitizedUser, accounts },
    };
  }

  async updateStatus(id: string, status: string, currentUserId: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (id === currentUserId && status !== 'active') {
      throw new BadRequestException('Cannot deactivate your own account');
    }

    user.status = status;
    await this.userRepository.save(user);

    const { passwordHash, ...sanitizedUser } = user;
    return {
      success: true,
      data: sanitizedUser,
      message: 'User status updated successfully',
    };
  }

  async resetPassword(id: string, newPassword: string) {
    if (!newPassword || newPassword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }
}
