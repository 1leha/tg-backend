import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { UserModule } from './entities/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { CategoryModule } from './entities/category/category.module';
import { TaskModule } from './entities/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        username: config.get<string>('dbUsername'),
        password: config.get<string>('dbPassword'),
        database: 'postgres',
        port: config.get<number>('dbPort'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UserModule,
    AuthModule,
    TokenModule,
    CategoryModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
