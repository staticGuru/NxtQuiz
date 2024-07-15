import { UseCaseError } from '@backend/core/errors/use-case-error';

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found');
  }
}

export class DatabaseError extends Error implements UseCaseError {}

export class BadRequestException extends Error implements UseCaseError {}
