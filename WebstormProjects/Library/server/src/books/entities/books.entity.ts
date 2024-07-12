import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Author} from "../../authors/entities/authors.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne( () => Author)
    @JoinColumn({name: 'authorId'})
    author: Author
}
