import { IsOptional, IsEnum, IsString } from 'class-validator';

export class UpdatePreferencesDto {
  @IsOptional()
  @IsEnum(['light', 'dark'])
  theme?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
