export class HttpException extends Error {
  constructor(
    private statusCode: number,
    private msg: string,
    private details: any = {},
  ) {
    super(msg);

    Object.setPrototypeOf(this, HttpException.prototype);
    Error.captureStackTrace(this, HttpException);
  }
}

export class NotFoundException extends HttpException {
  constructor(msg: string, details: any = {}) {
    super(404, msg, details);
  }
}

export class BadRequestException extends HttpException {
  constructor(msg: string, details: any = {}) {
    super(400, msg, details);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(msg: string, details: any = {}) {
    super(401, msg, details);
  }
}

export class ForbiddenException extends HttpException {
  constructor(msg: string, details: any = {}) {
    super(403, msg, details);
  }
}

export class ConflictException extends HttpException {
  constructor(msg: string, details: any = {}) {
    super(409, msg, details);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(msg: string, details: any = {}) {
    super(500, msg, details);
  }
}

export class ValidationException extends HttpException {
  constructor(msg: string, details: any = {}) {
    super(422, msg, details);
  }
}
