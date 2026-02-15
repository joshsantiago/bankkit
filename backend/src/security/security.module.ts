import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { User } from '../entities/user.entity';
import { UserSession } from '../entities/user-session.entity';
import { SecurityLog } from '../entities/security-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSession, SecurityLog])],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
