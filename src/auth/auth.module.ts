import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/entities/user/user.module';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/models/user.entity';
import { TokenModule } from 'src/token/token.module';
import { JwtStrategy } from 'src/strategy';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserEntity]), TokenModule],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
