import { NextFunction, Request, Response } from 'express';

export const ErrorExceptionType = {
    ValidationError: 'ValidationError',
    UsernameAlreadyTaken: 'UserNameAlreadyTaken',
    EmailAlreadyInUse: 'EmailAlreadyInUse',
    ValidationError: 'ValidationError',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    UserNotFound: 'UserNotFound'
}

class InvalidRequestBodyException extends Error {
    constructor(missingKeys: Array<string>) {
        super(`Body is missing required keys: ${missingKeys.join(", ")}`)
    }
}

export function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response | undefined {
  
    if(error instanceof InvalidRequestBodyException) {
        return res.status(400).json({
            error: ErrorExceptionType.ValidationError,
            data: undefined,
            success: false,
            message: error.message,
        });
    }

    return res.status(500).json({
        error: ErrorExceptionType.ServerError,
        data: undefined,
        success: false,
        message: error.message,
      });
}
