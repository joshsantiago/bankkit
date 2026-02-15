import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
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

  async uploadAvatar(userId: string, file: Express.Multer.File): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete old avatar if exists
    if (user.avatarUrl) {
      await this.deleteOldAvatar(user.avatarUrl);
    }

    // Process image with sharp (resize, optimize)
    const processedFilename = `avatar-${userId}-${Date.now()}.jpg`;
    const processedPath = path.join('./uploads/avatars', processedFilename);

    try {
      await sharp(file.path)
        .resize(400, 400, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({ quality: 85 })
        .toFile(processedPath);

      // Delete original uploaded file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      // Generate URL (in production, this would be a CDN URL)
      const avatarUrl = `/uploads/avatars/${processedFilename}`;

      // Update user record
      user.avatarUrl = avatarUrl;
      await this.userRepository.save(user);

      return avatarUrl;
    } catch (error) {
      // Clean up file on error
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw new BadRequestException('Failed to process image');
    }
  }

  async deleteAvatar(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.avatarUrl) {
      throw new BadRequestException('User has no avatar to delete');
    }

    // Delete file from storage
    await this.deleteOldAvatar(user.avatarUrl);

    // Clear avatar URL in database
    user.avatarUrl = null as any;
    await this.userRepository.save(user);
  }

  private async deleteOldAvatar(avatarUrl: string): Promise<void> {
    try {
      const filename = path.basename(avatarUrl);
      const filepath = path.join('./uploads/avatars', filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    } catch (error) {
      console.error('Failed to delete old avatar:', error);
      // Don't throw error, just log it
    }
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
