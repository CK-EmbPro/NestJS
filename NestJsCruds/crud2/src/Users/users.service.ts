import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";

@Injectable()

export class UsersService{
    constructor(
        private prisma: PrismaService
    ){}

    async getAllUsers():Promise<Users[]>{
        return  this.prisma.user.findMany()
    }

    async createUser(data:Users):Promise<any>{
        const existing = this.prisma.user.findUnique({
            where:{
                username: data.username
            }
        })

        if(existing){

            return 'existing'+existing
        }else{

            return await this.prisma.user.create({data})
        }
        
    }
    }