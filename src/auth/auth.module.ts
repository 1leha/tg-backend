import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/entities/user/user.module';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/models/user.entity';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserEntity]), TokenModule],
  providers: [AuthService, AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}
