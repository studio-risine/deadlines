/**
 * Extended Error interface with V8 specific methods
 */
interface ExtendedError extends ErrorConstructor {
	captureStackTrace?(
		targetObject: object,
		constructorOpt?: NewableFunction,
	): void;
}

/**
 * Base error class for the application
 */
export abstract class BaseError extends Error {
	public readonly code: string;
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(
		message: string,
		code: string,
		statusCode: number,
		isOperational = true,
	) {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		this.statusCode = statusCode;
		this.isOperational = isOperational;

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		const ExtError = Error as ExtendedError;
		if (ExtError.captureStackTrace) {
			ExtError.captureStackTrace(this, this.constructor);
		}
	}

	/**
	 * Serializes the error to JSON
	 */
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			code: this.code,
			statusCode: this.statusCode,
			stack: this.stack,
		};
	}

	/**
	 * Serializes the error to string
	 */
	toString() {
		return JSON.stringify(this.toJSON());
	}
}


/**
 * Error class for forbidden access
 */
export class ForbiddenError extends BaseError {
	constructor(message = "User is not authorized") {
		super(message, "FORBIDDEN", 403);
	}
}

