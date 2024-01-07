import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async updateBook(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book);
  }

  async deleteBook(id: string):Promise<string> {
   const res = await this.bookModel.findByIdAndDelete(id);
   if(res)
      return "Book deleted"
   
   throw new NotFoundException("Book not found");

  }
}
