import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './models/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/createCategory.input';
import { UserService } from '../user/service/user.service';
import { UserEntity } from '../user/models/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly userService: UserService,
  ) {}

  async createCategory(
    newCategory: CreateCategoryInput,
  ): Promise<CategoryEntity> {
    console.log('newCategory :>> ', newCategory);

    const category = await this.categoryRepository.create(newCategory);
    await this.categoryRepository.save(category);
    console.log('category :>> ', category);
    return category;
  }

  async getUser(id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async getUserCategories(id: number): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({ where: { id } });
  }
}
