import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  async deleteUserById(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(user: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update({ id: user.id }, { ...user });
    return await this.getUserById(user.id);
  }

  async getUsersPublicFieldsByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        token: true,
      },
    });
  }
}
