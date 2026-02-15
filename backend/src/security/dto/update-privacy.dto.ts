import { IsOptional, IsBoolean } from 'class-validator';

export class UpdatePrivacyDto {
  @IsOptional()
  @IsBoolean()
  dataSharing?: boolean;

  @IsOptional()
  @IsBoolean()
  locationAccess?: boolean;

  @IsOptional()
  @IsBoolean()
  marketingEmails?: boolean;

  @IsOptional()
  @IsBoolean()
  publicProfile?: boolean;
}
