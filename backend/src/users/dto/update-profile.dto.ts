import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'First name must not be empty' })
  @MaxLength(100, { message: 'First name must not exceed 100 characters' })
  first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Last name must not be empty' })
  @MaxLength(100, { message: 'Last name must not exceed 100 characters' })
  last_name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be valid E.164 format',
  })
  phone?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date of birth must be a valid date' })
  dateOfBirth?: string;
}
