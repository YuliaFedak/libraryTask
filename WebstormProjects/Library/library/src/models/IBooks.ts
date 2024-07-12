import {IAuthors} from "./IAuthors";

export interface IBooks {
    id: number;
    title: string;
    description: string;
    author: IAuthors
}

export interface CreateBook {
    title: string;
    description: string;
    authorName: string;
}

export interface UpdateBook {
    id: number;
    title: string;
    description: string;
    authorName: string;
}
