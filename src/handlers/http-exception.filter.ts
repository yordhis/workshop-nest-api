
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let data = { ...[exception.getResponse()] } ;
    
    let message: string | [] = []
    let statusCode: number = 0
    let error: string = "" ;

    /** adaptamos las respuestas del getReponse para que sea funicional para excepciones distintas a error 500 */
   for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      message = data[key]['message'] ;
      statusCode = data[key]['statusCode'] ;
      error = data[key]['error'] ;       
    }
   }

    response
      .status(status)
      .send({
        message,
        statusCode,
        error,
        cause: exception.cause,
        path: request.url,
        timestamp: new Date().toISOString(),
        // name: exception.name,
      });
  }
}
