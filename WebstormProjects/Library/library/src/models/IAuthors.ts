import {IBooks} from "./IBooks";

export interface IAuthors {
    id: number;
    name: string;
    books: IBooks[]
}

export interface CreateAuthor {
    name: string
}
