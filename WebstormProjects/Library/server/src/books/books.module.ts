import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Book} from "./entities/books.entity";
import {Author} from "../authors/entities/authors.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  providers: [BooksService],
  controllers: [BooksController]
})
export class BooksModule {}
