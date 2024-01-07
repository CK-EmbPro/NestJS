import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Redirect, Req, UseFilters, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "src/Guards/roles.guard";
import { LoggingInterceptor } from "src/interceptos/logging.interceptor";
import { ValidationPipe } from "src/pipes/classBasedValidation";
import { createCatSchema } from "src/pipes/schema/zodschema";
import { ZodValidatorPip } from "src/pipes/SchemaBasedValidation.pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto, UpdateCatDto } from "./dto";
import { HttpExceptionFilter } from "./http-exception.filter";
import { Cat } from "./interfaces/cats.interfaces";



@Controller('cats')
// @UseFilters(HttpExceptionFilter)  This to be applied to every route handler 
@UseGuards(new AuthGuard())
@UseInterceptors(LoggingInterceptor)
export class CatsController{

    constructor(private catsService: CatsService){}
    // @Inject() catsService: CatsService;

    @Get()
    @HttpCode(200)
    async findAll(@Req() request : Request ):Promise<Cat[]>{
        return this.catsService.findAll()
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Some custome message'
        }, HttpStatus.FORBIDDEN, {cause: 'some error passed as an argument'});
    }
    @Redirect('https://docs.nestjs.com', 302)


    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id : number): string{
        return `this is the parameter ${id}`
    }



    @Post()
    @HttpCode(201)
    @Roles(['admin'])
    create(@Body(new ValidationPipe()) createCatDto : CreateCatDto): Cat[]{
       return this.catsService.create(createCatDto)
    }

    @Put(':id')
    @UsePipes(new ZodValidatorPip(createCatSchema))
    @HttpCode(201)
    updateCat(@Param('id') id : string, @Body() updateCatDto : UpdateCatDto): string{
        return  `cat n ${id} updated successfully`
    }

    @Delete(':id')
    @HttpCode(200)
    removeCat(@Param('id') id : string): string{
        return "cat deleted"
    }

}
