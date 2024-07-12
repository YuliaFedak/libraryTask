import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../../books/entities/books.entity";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany( () => Book, (book) => book.author, {onDelete: 'CASCADE'})
    books: Book[];
}
