import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum Category{
    Adventure = "Adventure",
    Classics = "Classics",
    Crimes = "Crimes",
    Fantasy = "Fantasy"
} 
@Schema({
    timestamps: true
})

export class Book{
    @Prop()
    title: string
    @Prop()
    description: string
    @Prop()
    author: string
    @Prop()
    price: number
    @Prop()
    category: Category
}

export const BookSchema = SchemaFactory.createForClass(Book)