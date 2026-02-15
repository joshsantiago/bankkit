import { Controller, Get, Patch, Delete, UseGuards, Param, Body, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateAccountStatusDto } from './dto/update-account-status.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get('accounts')
  getAccounts() {
    return this.adminService.getAccounts();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id/status')
  updateUserStatus(@Param('id') id: string, @Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(id, updateUserStatusDto);
  }

  @Patch('users/:id/role')
  updateUserRole(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.adminService.updateUserRole(id, updateUserRoleDto);
  }

  @Patch('accounts/:id/status')
  updateAccountStatus(@Param('id') id: string, @Body() updateAccountStatusDto: UpdateAccountStatusDto) {
    return this.adminService.updateAccountStatus(id, updateAccountStatusDto);
  }

  @Get('transactions')
  getAllTransactions(@Query('limit') limit: string) {
    return this.adminService.getAllTransactions(limit ? parseInt(limit) : 50);
  }
}
