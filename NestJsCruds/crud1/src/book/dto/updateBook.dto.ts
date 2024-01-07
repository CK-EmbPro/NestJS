import { Category } from "../schemas/book.schema";

export class UpdateBookDto{
    title: string;
    author:string;
    description: string;
    price: number;
    category: Category
}