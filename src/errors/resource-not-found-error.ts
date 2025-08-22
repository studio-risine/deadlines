import { BaseError } from "./base-error";

/**
 * Error class for resource not found
 */
export class ResourceNotFoundError extends BaseError {
	constructor(message = "Resource not found") {
		super(message, "RESOURCE_NOT_FOUND", 404);
	}
}