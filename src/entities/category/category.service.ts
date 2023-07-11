import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './models/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/createCategory.input';
import { UserService } from '../user/service/user.service';
import { UserEntity } from '../user/models/user.entity';
import { UpdateCategoryInput } from './dto/updateCategory.input';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(
    newCategory: CreateCategoryInput,
  ): Promise<CategoryEntity> {
    const category = this.categoryRepository.create(newCategory);

    await this.categoryRepository.save(category);

    return category;
  }

  async getUser(id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async getUserCategories(id: number): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({ where: { userId: id } });
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async updateCategory(dto: UpdateCategoryInput): Promise<CategoryEntity> {
    await this.categoryRepository.update({ id: dto.id }, { ...dto });

    const updatedUCategory = await this.getCategoryById(dto.id);
    return updatedUCategory;
  }

  async deleteCategory(id: number): Promise<number> {
    await this.categoryRepository.delete(id);
    return id;
  }
}
