import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Book} from "./entities/books.entity";
import {Repository} from "typeorm";
import {CreateBookDto} from "./dto/create-book";
import {Author} from "../authors/entities/authors.entity";
import {UpdateBookDto} from "./dto/update-book";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Author)
        readonly authorRepository :Repository<Author>
    ) {}

    async create(createBookDto : CreateBookDto) {
        let author = await this.authorRepository.findOne({
            where: {name: createBookDto.authorName}
        })

       if (!author) {
           author = await this.authorRepository.save({
               name: createBookDto.authorName,
           })
       }

       const book = await this.bookRepository.save({
           title: createBookDto.title,
           description: createBookDto.description,
           author: author
       })
        return book
    }

    async findAll() {
        const books = await this.bookRepository.find({
            relations: ['author'],
        })
        return books
    }

    async update(id: number, updateBookDto: UpdateBookDto) {
        const book = await this.bookRepository.findOne({ where: { id }, relations: ['author'] });

        if (!book) throw new NotFoundException(`Book not found`);


        Object.assign(book, updateBookDto);

        if (updateBookDto.authorName) {
            let author = await this.authorRepository.findOne({ where: { name: updateBookDto.authorName } });
            if (!author) {
                author = await this.authorRepository.save({ name: updateBookDto.authorName });
            }
            book.author = author;
        }
        return await this.bookRepository.save(book);
    }

    async remove(id: number) {
        const ExistBook = await this.bookRepository.findOne({ where: { id }});

        if (!ExistBook) throw new NotFoundException(`Book not found`);

        const removeBook = await this.bookRepository.delete(id)

        return removeBook
    }

    async filterByAuthor(authorName?: string): Promise<Book[]> {
        const books = await this.bookRepository.find({ relations: ['author'] });

        if (authorName) {
            return books.filter(book =>
                book.author && book.author.name.toLowerCase().includes(authorName.toLowerCase())
            );
        }
        return books;
    }


    private convertToCSV(books: Book[]): string {
        const headers = 'ID,Title,Description,Author\n';
        const rows = books.map(book => `${book.id},"${book.title}","${book.description}",${book.author.name}`).join('\n');
        return headers + rows;
    }

    async exportBooks() {
        const books = await this.findAll();
        const csv = this.convertToCSV(books);
        return csv;
    }

}
