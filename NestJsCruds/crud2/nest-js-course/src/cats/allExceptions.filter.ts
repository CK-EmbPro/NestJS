import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost

    ){
    }
        catch(exception:unknown, host: ArgumentsHost){
            const ctx = host.switchToHttp()
            const {httpAdapter} = this.httpAdapterHost;

            const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

            const responseBody = {
                statusCode: httpStatus,
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(ctx.getRequest)
            }

        }
    
}