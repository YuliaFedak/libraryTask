import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Author} from "./entities/authors.entity";
import {Book} from "../books/entities/books.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [AuthorsService],
  controllers: [AuthorsController]
})
export class AuthorsModule {}
