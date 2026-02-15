import { IsEnum } from 'class-validator';

export class UpdateUserStatusDto {
  @IsEnum(['active', 'suspended', 'inactive'])
  status: string;
}
