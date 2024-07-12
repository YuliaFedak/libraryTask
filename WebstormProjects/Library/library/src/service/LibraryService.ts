import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CreateBook, IBooks, UpdateBook} from "../models/IBooks";
import {CreateAuthor, IAuthors} from "../models/IAuthors";

export const libraryAPI = createApi({
    reducerPath: 'libraryAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/'
    }),
    tagTypes: ["Author"],
    endpoints: (build) =>  ({
        fetchAllBooks: build.query<IBooks, void>({
            query: () => ({
                url: '/books'
            }),
        }),
        fetchAllAuthors: build.query<IAuthors[], void>({
            query: () => ({
                url: '/authors'
            }),
            providesTags: result => ["Author"]
        }),
        createAuthor: build.mutation<CreateAuthor, CreateAuthor >({
            query: (author) => ({
                url: '/authors',
                method: `POST`,
                body: author
            }),
            invalidatesTags: ["Author"]
        }),
        deleteAuthor: build.mutation<IAuthors, IAuthors>({
            query: (author) => ({
                url: `/authors/${author.id}`,
                method: `DELETE`
            }),
            invalidatesTags: ["Author"]
        }),
        // Book
        createBook: build.mutation<CreateBook, CreateBook>({
            query: (book) => ({
                url: `/books`,
                method: `POST`,
                body: book
            }),
            invalidatesTags: ["Author"]
        }),
        deleteBook: build.mutation<IBooks, IBooks>({
            query: (book) => ({
                url: `/books/${book.id}`,
                method: `DELETE`
            }),
            invalidatesTags: ["Author"]
        }),
        updateBook: build.mutation<UpdateBook, UpdateBook>({
            query: (book) => ({
                url: `books/${book.id}`,
                method: 'PATCH',
                body: book
            }),
            invalidatesTags: ["Author"]
        }),
        exportBooks: build.mutation<string, void>({
            query: () => ({
                url: '/books/export',
                method: 'GET',
                responseHandler: (response) => response.text(),
            }),
        }),
    })
})
export const {
    useFetchAllBooksQuery,
    useFetchAllAuthorsQuery,
    useCreateAuthorMutation,
    useDeleteAuthorMutation,
    useCreateBookMutation,
    useDeleteBookMutation,
    useUpdateBookMutation,
    useExportBooksMutation
} = libraryAPI
