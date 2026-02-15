import { IsString, IsNotEmpty, IsEnum, IsOptional, IsBoolean, IsNumber, Matches } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty({ message: 'Card name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Card number is required' })
  @IsString()
  @Matches(/^\d{13,19}$/, { message: 'Card number must be 13-19 digits' })
  cardNumber: string;

  @IsNotEmpty({ message: 'Expiry date is required' })
  @IsString()
  @Matches(/^\d{2}\/\d{2}$/, { message: 'Expiry must be in MM/YY format' })
  expiry: string;

  @IsNotEmpty({ message: 'CVV is required' })
  @IsString()
  @Matches(/^\d{3,4}$/, { message: 'CVV must be 3-4 digits' })
  cvv: string;

  @IsNotEmpty({ message: 'Card brand is required' })
  @IsEnum(['Visa', 'Mastercard', 'Amex', 'Discover'], {
    message: 'Card brand must be one of: Visa, Mastercard, Amex, Discover',
  })
  brand: string;

  @IsNotEmpty({ message: 'Card type is required' })
  @IsEnum(['Debit', 'Credit'], { message: 'Card type must be Debit or Credit' })
  cardType: string;

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
  accountId?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
