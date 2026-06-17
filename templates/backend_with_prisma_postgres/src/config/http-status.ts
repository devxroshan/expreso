export const HttpStatus = {
    // 1xx Informational
    Continue: 100,

    // 2xx Success
    OK: 200,
    Created: 201,
    Accepted: 202,
    NoContent: 204,

    // 3xx Redirection
    // (add as needed)

    // 4xx Client Errors
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    Conflict: 409,
    UnprocessableEntity: 422,

    // 5xx Server Errors
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
}