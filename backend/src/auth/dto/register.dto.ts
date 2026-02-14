import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  first_name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  last_name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(['checking', 'savings', 'both'])
  accountType?: 'checking' | 'savings' | 'both';
}
