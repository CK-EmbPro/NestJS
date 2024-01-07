import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidatorPip implements PipeTransform{
    constructor(private schema: ZodSchema){}

    transform(value: any, metadata: ArgumentMetadata) {
        try {
        const parsedValue = this.schema.parse(value)
        return parsedValue
        }catch(err){
            throw new BadRequestException('Validation failed')
        }
    }
}