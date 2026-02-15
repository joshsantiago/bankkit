import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(['Visa', 'Mastercard', 'Amex', 'Discover'])
  brand?: string;

  @IsOptional()
  @IsEnum(['Debit', 'Credit'])
  cardType?: string;

  @IsOptional()
  @IsBoolean()
  isVirtual?: boolean;

  @IsOptional()
  @IsNumber()
  dailyLimit?: number;

  @IsOptional()
  @IsNumber()
  monthlyLimit?: number;

  @IsOptional()
  @IsString()
  color?: string;
}

export class UpdateCardStatusDto {
  @IsEnum(['Active', 'Frozen', 'Cancelled'], {
    message: 'Status must be one of: Active, Frozen, Cancelled',
  })
  status: string;
}
