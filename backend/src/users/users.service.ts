import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    // Find user
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update fields (only if provided)
    if (updateProfileDto.first_name !== undefined) {
      user.firstName = updateProfileDto.first_name;
    }
    if (updateProfileDto.last_name !== undefined) {
      user.lastName = updateProfileDto.last_name;
    }
    if (updateProfileDto.phone !== undefined) {
      user.phone = updateProfileDto.phone;
    }
    if (updateProfileDto.dateOfBirth !== undefined) {
      user.dateOfBirth = new Date(updateProfileDto.dateOfBirth);
    }

    // Save to database
    const updatedUser = await this.userRepository.save(user);

    // Remove sensitive fields before returning
    const { passwordHash, ...sanitizedUser } = updatedUser;
    return sanitizedUser;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    // Find user
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Don't allow same password
    const isSamePassword = await bcrypt.compare(
      changePasswordDto.newPassword,
      user.passwordHash,
    );

    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from current password',
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(changePasswordDto.newPassword, salt);

    // Save to database
    await this.userRepository.save(user);

    // TODO: Send email notification about password change
    // TODO: Invalidate all other sessions (logout from other devices)
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
