import { Category } from "../schemas/book.schema";

export class CreateBookDto{
    title: string;
    author:string;
    description: string;
    price; number;
    category: Category
}