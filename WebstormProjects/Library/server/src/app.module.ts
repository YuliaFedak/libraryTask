import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import {Author} from "./authors/entities/authors.entity";
import {Book} from "./books/entities/books.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('DB_HOST'),
              port: configService.get('DB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get<string>('DB_NAME'),
              synchronize: true,
              entities: [Author, Book],
          }),
          inject: [ConfigService],
      }),
      BooksModule,
      AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
