import {Controller, Post, Body, Get, Patch, Param, Delete, Query, Res} from '@nestjs/common';
import {BooksService} from "./books.service";
import {CreateBookDto} from "./dto/create-book";
import {UpdateBookDto} from "./dto/update-book";
import {Book} from "./entities/books.entity";
import {Response} from "express";

@Controller('books')
export class BooksController {
    constructor(private readonly booksService :BooksService) {}

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto)
    }

    @Get()
    findAll() {
        return this.booksService.findAll()
    }

    @Patch(':id')
    update(
        @Param('id') id:number,
        @Body() updateBookDto: UpdateBookDto
    ) {
        return this.booksService.update(id, updateBookDto)
    }

    @Delete(":id")
    remove(@Param('id') id : number) {
        return this.booksService.remove(id)
    }

    @Get()
    async filter(@Query('authorName') authorName?: string): Promise<Book[]> {
        return this.booksService.filterByAuthor(authorName)
    }

    @Get('export')
    async export(@Res() response: Response) {
        const csv = await this.booksService.exportBooks();
        response.header('Content-Type', 'text/csv');
        response.attachment('books.csv');
        response.send(csv);
    }
}
