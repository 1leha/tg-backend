import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserResolver } from './resolver/user.resolver';
import { TokenModule } from 'src/token/token.module';
import { JwtStrategy } from 'src/strategy';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TokenModule,
    forwardRef(() => CategoryModule),
  ],
  providers: [UserService, UserResolver, JwtStrategy, JwtAuthGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
