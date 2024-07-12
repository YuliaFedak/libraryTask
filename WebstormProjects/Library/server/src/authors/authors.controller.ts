import {Body, Controller, Delete, Param, Post, Get} from '@nestjs/common';
import {AuthorsService} from "./authors.service";
import {CreateAuthorDto} from "./dto/create-author";

@Controller('authors')
export class AuthorsController {
    constructor(private readonly authorService: AuthorsService) {}

    @Post()
    create(@Body() createAuthorDto : CreateAuthorDto) {
        return this.authorService.create(createAuthorDto)
    }

    @Get()
    findAll() {
        return this.authorService.findAll()
    }

    @Delete(':id')
    remove(@Param('id') id : number) {
        return this.authorService.remove(id)
    }
}
