import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { HttpExceptionFilter } from './cats/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ValidationPipe } from './pipes/classBasedValidation';

@Module({
  imports: [CatsModule],
  providers:[{
    provide: APP_FILTER,
    useClass:HttpExceptionFilter
  },
  {
    provide: APP_PIPE,
    useClass:ValidationPipe
    
  }
]
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes({path:'cats', method:RequestMethod.POST})
  }
}
