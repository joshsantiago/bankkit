import { IsEnum } from 'class-validator';

export class UpdateAccountStatusDto {
  @IsEnum(['active', 'frozen', 'closed'])
  status: string;
}
