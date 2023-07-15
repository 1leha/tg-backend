import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryEntity } from './models/category.entity';
import { CreateCategoryInput } from './dto/createCategory.input';
import { UserEntity } from '../user/models/user.entity';
import { UpdateCategoryInput } from './dto/updateCategory.input';
import { TaskEntity } from '../task/models/task.entity';
import { TaskService } from '../task/task.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly taskService: TaskService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CategoryEntity)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(createCategoryInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CategoryEntity)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<CategoryEntity> {
    return await this.categoryService.updateCategory(updateCategoryInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Number)
  async deleteCategory(@Args('id') id: number): Promise<number> {
    return await this.categoryService.deleteCategory(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [CategoryEntity])
  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getAllCategories();
  }

  @UseGuards(JwtAuthGuard)
  @ResolveField(() => UserEntity)
  user(@Parent() category: CategoryEntity): Promise<UserEntity> {
    return this.categoryService.getUser(category.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ResolveField(() => TaskEntity)
  task(@Parent() category: CategoryEntity): Promise<TaskEntity[]> {
    return this.taskService.getTasksByCategory(category.id);
  }
}
