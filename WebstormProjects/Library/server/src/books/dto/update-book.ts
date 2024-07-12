import {Author} from "../../authors/entities/authors.entity";
import {PartialType} from "@nestjs/mapped-types";
import {CreateBookDto} from "./create-book";


export class UpdateBookDto extends PartialType(CreateBookDto) {
    authorName?: string
}
