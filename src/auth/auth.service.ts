import { Injectable, BadRequestException } from '@nestjs/common';
import { appErrors } from 'src/common/constants/appErrors';
import { CreateUserInput } from 'src/entities/user/inputs/createUser.input';
import { UserEntity } from 'src/entities/user/models/user.entity';
import { UserService } from 'src/entities/user/service/user.service';
import { LoginUserInput } from './inputs/loginUser.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(user: CreateUserInput): Promise<UserEntity> {
    const existUser = await this.userService.getUserByEmail(user.email);
    if (existUser) throw new BadRequestException(appErrors.USER_EXIST);

    return await this.userService.createUser(user);
  }

  async loginUser(user: LoginUserInput): Promise<UserEntity> {
    const existUser = await this.userService.getUserByEmail(user.email);
    if (!existUser) throw new BadRequestException(appErrors.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(
      user.password,
      existUser.password,
    );

    if (!validatePassword) throw new BadRequestException(appErrors.BAD_REQUEST);
    return existUser;
  }
}
