import { NextFunction, Request, Response } from 'express';

export const Errors = {
    ValidationError: 'ValidationError',
    UsernameAlreadyTaken: 'UserNameAlreadyTaken',
    EmailAlreadyInUse: 'EmailAlreadyInUse',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    UserNotFound: 'UserNotFound'
}

export class InvalidRequestBodyException extends Error {
    constructor(missingKeys: Array<string>) {
        super(`Body is missing required keys: ${missingKeys.join(", ")}`)
    }
}

export class EmailAlreadyInUse extends Error {
    constructor() {
        super(`Email in use`)
    }
}

export class UserNameAlreadyInUse extends Error {
    constructor() {
        super(`Username already in use`)
    }
}

export function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response | undefined {
  
    if(error instanceof InvalidRequestBodyException) {
        return res.status(400).json({
            error: Errors.ValidationError,
            data: undefined,
            success: false,
            message: error.message,
        });
    }

    if(error instanceof EmailAlreadyInUse) {
        return res.status(409).json({ 
            error: Errors.EmailAlreadyInUse,
            data: undefined,
            success: false,
            message: error.message,
        });
    }

    if(error instanceof UserNameAlreadyInUse) {
        return res.status(409).json({ 
            error: Errors.UsernameAlreadyTaken,
            data: undefined,
            success: false,
            message: error.message,
        });
    }

    return res.status(500).json({
        error: Errors.ServerError,
        data: undefined,
        success: false,
        message: error.message,
      });
}
