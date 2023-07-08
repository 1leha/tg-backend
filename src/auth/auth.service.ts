import { Injectable, BadRequestException } from '@nestjs/common';
import { appErrors } from 'src/common/constants/appErrors';
import { CreateUserInput } from 'src/entities/user/inputs/createUser.input';
import { UserEntity } from 'src/entities/user/models/user.entity';
import { UserService } from 'src/entities/user/service/user.service';
import { LoginUserInput } from './inputs/loginUser.input';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { LoginUserResponse } from './Response/loginUser.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(user: CreateUserInput): Promise<UserEntity> {
    const existUser = await this.userService.getUserByEmail(user.email);
    if (existUser) throw new BadRequestException(appErrors.USER_EXIST);
    const token = await this.tokenService.generateJwtToken(user.email);

    return await this.userService.createUser({ ...user, token });
  }

  async loginUser(user: LoginUserInput): Promise<LoginUserResponse> {
    const existUser = await this.userService.getUserByEmail(user.email);
    if (!existUser) throw new BadRequestException(appErrors.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(
      user.password,
      existUser.password,
    );

    if (!validatePassword) throw new BadRequestException(appErrors.BAD_REQUEST);

    const token = await this.tokenService.generateJwtToken(user.email);
    return { email: existUser.email, token };
  }
}
