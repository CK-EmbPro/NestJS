import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cats.interfaces";

@Injectable()

export class CatsService {
    private cats: Cat[]= []

    create(cat: Cat): Cat[]{
        this.cats.push(cat);
        return this.cats;
    }

    findAll():Cat[]{
        return this.cats
    }


}