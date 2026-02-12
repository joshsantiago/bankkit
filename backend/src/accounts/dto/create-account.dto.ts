import { IsIn } from 'class-validator';

export class CreateAccountDto {
  @IsIn(['checking', 'savings'])
  account_type: string;
}
