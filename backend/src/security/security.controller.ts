import { Controller, Get, Patch, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { SecurityService, PrivacySettings } from './security.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatePrivacyDto } from './dto/update-privacy.dto';

@Controller('security')
@UseGuards(JwtAuthGuard)
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  /**
   * Get security overview (features, checklist, recent activity)
   */
  @Get('overview')
  async getOverview(@Request() req) {
    return this.securityService.getOverview(req.user.id);
  }

  /**
   * Get full security activity log
   */
  @Get('activity')
  async getActivityLog(@Request() req) {
    return this.securityService.getActivityLog(req.user.id);
  }

  /**
   * Get all active sessions
   */
  @Get('sessions')
  async getSessions(@Request() req) {
    return this.securityService.getSessions(req.user.id);
  }

  /**
   * Revoke a specific session
   */
  @Delete('sessions/:id')
  async revokeSession(@Request() req, @Param('id') sessionId: string) {
    return this.securityService.revokeSession(req.user.id, sessionId);
  }

  /**
   * Revoke all other sessions
   */
  @Delete('sessions')
  async revokeAllSessions(@Request() req) {
    return this.securityService.revokeAllSessions(req.user.id);
  }

  /**
   * Get privacy settings
   */
  @Get('privacy')
  async getPrivacySettings(@Request() req): Promise<{ success: boolean; data: any }> {
    const settings = await this.securityService.getPrivacySettings(req.user.id);
    return {
      success: true,
      data: settings,
    };
  }

  /**
   * Update privacy settings
   */
  @Patch('privacy')
  async updatePrivacySettings(
    @Request() req,
    @Body() updatePrivacyDto: UpdatePrivacyDto,
  ): Promise<{ success: boolean; data: any; message: string }> {
    const settings = await this.securityService.updatePrivacySettings(req.user.id, updatePrivacyDto);
    return {
      success: true,
      data: settings,
      message: 'Privacy settings updated successfully',
    };
  }

  /**
   * Toggle 2FA on/off
   */
  @Post('2fa/toggle')
  async toggle2FA(@Request() req) {
    const result = await this.securityService.toggle2FA(req.user.id);
    const message = result.enabled ? '2FA enabled successfully' : '2FA disabled successfully';
    return {
      success: true,
      data: result,
      message,
    };
  }
}
