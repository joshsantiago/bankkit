import { IsUUID, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateTransferDto {
  @IsUUID()
  from_account_id: string;

  @IsUUID()
  to_account_id: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;
}
