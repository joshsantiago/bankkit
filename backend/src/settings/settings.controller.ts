import { Controller, Get, Patch, Post, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { SettingsService, NotificationSettings, AppPreferences } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { SubmitTicketDto } from './dto/submit-ticket.dto';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  /**
   * Get notification preferences
   */
  @Get('notifications')
  async getNotifications(@Request() req): Promise<{ success: boolean; data: any }> {
    const notifications = await this.settingsService.getNotifications(req.user.id);
    return {
      success: true,
      data: notifications,
    };
  }

  /**
   * Update notification preferences
   */
  @Patch('notifications')
  async updateNotifications(
    @Request() req,
    @Body() updateNotificationsDto: UpdateNotificationsDto,
  ): Promise<{ success: boolean; data: any; message: string }> {
    const notifications = await this.settingsService.updateNotifications(
      req.user.id,
      updateNotificationsDto,
    );
    return {
      success: true,
      data: notifications,
      message: 'Notification preferences updated successfully',
    };
  }

  /**
   * Get app preferences
   */
  @Get('preferences')
  async getPreferences(@Request() req): Promise<{ success: boolean; data: any }> {
    const preferences = await this.settingsService.getPreferences(req.user.id);
    return {
      success: true,
      data: preferences,
    };
  }

  /**
   * Update app preferences
   */
  @Patch('preferences')
  async updatePreferences(
    @Request() req,
    @Body() updatePreferencesDto: UpdatePreferencesDto,
  ): Promise<{ success: boolean; data: any; message: string }> {
    const preferences = await this.settingsService.updatePreferences(
      req.user.id,
      updatePreferencesDto,
    );
    return {
      success: true,
      data: preferences,
      message: 'App preferences updated successfully',
    };
  }

  /**
   * Export user data
   */
  @Post('export-data')
  async exportData(@Request() req) {
    const data = await this.settingsService.exportData(req.user.id);
    return {
      success: true,
      data,
      message: 'Data export generated successfully',
    };
  }

  /**
   * Toggle account freeze status
   */
  @Patch('freeze-account')
  async freezeAccount(@Request() req) {
    const result = await this.settingsService.freezeAccount(req.user.id);
    const message =
      result.status === 'suspended'
        ? 'Account frozen successfully'
        : 'Account unfrozen successfully';
    return {
      success: true,
      data: { status: result.status },
      message,
    };
  }

  /**
   * Close account (soft delete)
   */
  @Delete('account')
  async closeAccount(@Request() req) {
    const result = await this.settingsService.closeAccount(req.user.id);
    return {
      success: true,
      message: result.message,
    };
  }

  /**
   * Get referral code
   */
  @Get('referral')
  async getReferralCode(@Request() req) {
    const referral = await this.settingsService.getReferralCode(req.user.id);
    return {
      success: true,
      data: referral,
    };
  }

  /**
   * Submit support ticket
   */
  @Post('support/ticket')
  async submitTicket(@Request() req, @Body() submitTicketDto: SubmitTicketDto) {
    const ticket = await this.settingsService.submitTicket(req.user.id, submitTicketDto);
    return {
      success: true,
      data: ticket,
    };
  }
}
