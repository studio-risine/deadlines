import { BaseError } from "./base-error";

/**
 * Error class for resource already exists
 */
export class ResourceAlreadyExistsError extends BaseError {
	constructor(message = "Resource already exists") {
		super(message, "RESOURCE_ALREADY_EXISTS", 409);
	}
}