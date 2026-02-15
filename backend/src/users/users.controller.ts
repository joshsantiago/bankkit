import { Controller, Get, Patch, Post, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AvatarUploadInterceptor } from './interceptors/file-upload.interceptor';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // User endpoints (authenticated users can access their own data)
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user.id;
    const updatedUser = await this.usersService.updateProfile(userId, updateProfileDto);

    return {
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = req.user.id;
    await this.usersService.changePassword(userId, changePasswordDto);

    return {
      success: true,
      message: 'Password changed successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(AvatarUploadInterceptor)
  async uploadAvatar(@Request() req, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const userId = req.user.id;
    const avatarUrl = await this.usersService.uploadAvatar(userId, file);

    return {
      success: true,
      data: { avatarUrl },
      message: 'Avatar uploaded successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('avatar')
  async deleteAvatar(@Request() req) {
    const userId = req.user.id;
    await this.usersService.deleteAvatar(userId);

    return {
      success: true,
      message: 'Avatar deleted successfully',
    };
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Request() req) {
    return this.usersService.updateStatus(id, status, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/password')
  resetPassword(@Param('id') id: string, @Body('new_password') newPassword: string) {
    return this.usersService.resetPassword(id, newPassword);
  }
}
