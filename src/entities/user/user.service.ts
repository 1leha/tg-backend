import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/createUser.input';
import { TokenService } from 'src/token/token.service';
import { CurrentUserResponse } from './dto/currentUser.response';
import { CategoryService } from 'src/entities/category/category.service';
import { CurrentUserInput } from './dto/currentUser.input';
import { UpdateUserInput } from './dto/updateUser.input';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
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

  async createUser(user: CreateUserInput) {
    const newUser = this.userRepository.create(user);

    const hashedPassword = await this.hashPassword(user.password);
    newUser.password = hashedPassword;
    await this.userRepository.save(newUser);

    return newUser;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getCurrentUser(req: any): Promise<UserEntity> {
    const token = req.headers.authorization.split(' ')[1];

    return await this.userRepository.findOne({
      where: { token },
      select: {
        id: true,
        email: true,
        token: true,
      },
    });
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

  async updateToken(email: string, token: string): Promise<any> {
    await this.userRepository.update({ email }, { token });
    return;
  }

  async resetTokenOfCurrentUser(
    currentUser: CurrentUserInput,
  ): Promise<string> {
    await this.userRepository.update(
      { email: currentUser.email },
      { token: null },
    );
    return currentUser.email;
  }

  async getUsersPublicFieldsByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        token: true,
      },
    });
  }

  async getUserCategory(id: number) {
    return await this.categoryService.getUserCategories(id);
  }
}
