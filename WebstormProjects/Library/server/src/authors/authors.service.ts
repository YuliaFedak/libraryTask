import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Author} from "./entities/authors.entity";
import {Repository} from "typeorm";
import {CreateAuthorDto} from "./dto/create-author";
import {Book} from "../books/entities/books.entity";

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,

        @InjectRepository(Book)
        private readonly bookRepository : Repository<Book>
    ) {}

    async create(createAuthorDto : CreateAuthorDto) {
        const ExistAuthor = await this.authorRepository.findOne({
            where: { name: createAuthorDto.name}
        })

        if (ExistAuthor) throw new  BadRequestException("This author already exists")

        const author = await this.authorRepository.save({
            name: createAuthorDto.name
        })
        return author
    }

    async findAll() {
        const authors = await this.authorRepository.find({
            relations: ['books'],
        })
        return authors
    }


    async remove(id: number) {
        const ExistAuthor = await this.authorRepository.findOne({
            where: {id}
        })
        if (!ExistAuthor) throw new  NotFoundException("Author not found")

        await this.bookRepository.delete({ author: {id} });

        const removeAuthor = await this.authorRepository.delete(id)

        return removeAuthor
    }
}
