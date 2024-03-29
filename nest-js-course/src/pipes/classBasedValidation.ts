import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";



@Injectable()
export class ValidationPipe implements PipeTransform<any>{

    private toValidate(metatype: Function):boolean{
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype)
    }

    async transform(value: any, {metatype}: ArgumentMetadata) {
        if(!metatype || !this.toValidate(metatype)){
            return value
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object)

        if(errors.length> 0){
            throw new BadRequestException('Validation failed')
        }
        return value
    }
}






// import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";


// @Injectable()
// export class ValidationPipe implements PipeTransform{
//     transform(value: any, metadata: ArgumentMetadata){
//         return value;
//     }
// }     This is for the normal validation pipeline

// Using class-validator class-transformer
