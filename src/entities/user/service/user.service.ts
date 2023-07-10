import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../inputs/createUser.input';
import { UpdateUserInput } from '../inputs/updateUser.input';
import { TokenService } from 'src/token/token.service';
import { AuthUserResponse } from 'src/auth/Response/authUser.response';
import { CurrentUserInput } from '../inputs/currentUser.input';
import { CurrentUserResponse } from '../Response/currentUser.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserInput): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(user.password);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return user as UserEntity;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getCurrentUser(req: any): Promise<CurrentUserInput> {
    const token = req.headers.authorization.split(' ')[1];
    const user: any = this.tokenService.decodeJwtToken(token);
    return await this.getUsersPublicFieldsByEmail(user.data);
  }

  async deleteUserById(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateCurrentUser(
    currentUser: CurrentUserInput,
    updatedData: UpdateUserInput,
  ): Promise<CurrentUserResponse> {
    await this.userRepository.update(
      { email: currentUser.email },
      { ...updatedData },
    );
    return { ...currentUser, ...updatedData };
  }

  async getUsersPublicFieldsByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        token: true,
      },
    });
  }
}
