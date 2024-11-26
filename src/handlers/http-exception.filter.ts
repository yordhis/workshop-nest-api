
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    
    
    response
      .status(status)
      .send({
        message: exception.message,
        cause: exception.cause,
        statusCode: status,
        path: request.url,
        timestamp: new Date().toISOString(),
        // name: exception.name,
      });
  }
}
