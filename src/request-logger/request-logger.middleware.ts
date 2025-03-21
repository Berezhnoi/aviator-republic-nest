import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: any, res: any, next: () => void) {
    const { ip, method, baseUrl: url } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
