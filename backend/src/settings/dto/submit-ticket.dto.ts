import { IsString, IsOptional, IsEnum, MinLength, MaxLength } from 'class-validator';

export class SubmitTicketDto {
  @IsString()
  @MinLength(5, { message: 'Subject must be at least 5 characters' })
  @MaxLength(200, { message: 'Subject must not exceed 200 characters' })
  subject: string;

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(2000, { message: 'Description must not exceed 2000 characters' })
  description: string;

  @IsOptional()
  @IsEnum(['general', 'card', 'account', 'security', 'billing'])
  category?: string;
}
