import { IsInt, IsString } from "class-validator"

export class CreateCatDto{
    @IsString()
    name: string

    @IsInt()
    age: number

    @IsString()
    breed: string
}


export class UpdateCatDto{
    @IsString()
    name: string

    @IsInt()
    age: number

    @IsString()
    breed: string
}



export class ListCatDto{
    @IsString()
    name: string

    @IsInt()
    age: number

    @IsString()
    breed: string
}

