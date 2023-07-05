import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
// import { IUser } from '../models/user.interface';
import * as bcrypt from 'bcrypt';
import { appErrors } from 'src/common/appErrors';
import { CreateUserInput } from '../inputs/createUser.input';
import { UpdateUserInput } from '../inputs/updateUser.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: CreateUserInput): Promise<UserEntity> {
    console.log('createUser user:>> ', user);
    const hashedPassword = await this.hashPassword(user.password);
    user.password = hashedPassword;

    const isExixstUser = await this.getUserByEmail(user.email);
    if (isExixstUser) throw new BadRequestException(appErrors.USER_EXIST);

    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUserById(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(user: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update({ id: user.id }, { ...user });
    return await this.getUserById(user.id);
  }
}
