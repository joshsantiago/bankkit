import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NotificationChannelDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  push: boolean;
}

export class UpdateNotificationsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationChannelDto)
  security?: NotificationChannelDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationChannelDto)
  transactions?: NotificationChannelDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationChannelDto)
  reminders?: NotificationChannelDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationChannelDto)
  features?: NotificationChannelDto;
}
