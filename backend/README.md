# SimpleStudy Backend
This repository contains the backend code for SimpleStudy, built with NestJS. The architecture follows the [Clean Architecture pattern](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and [Hexagonal Architecture](http://www.maximecolin.fr/uploads/2015/11/56570243d02c0_hexagonal-architecture.png), emphasizing the [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)), particularly the [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) (do not mix up with the classic dependency injection in NestJS for example).


## Directory Structure

Concretely, there are 3 main packages: `core`, `domain` and `infra`. These packages have to respect these rules:
- `src/core` Contains common entities, enums, errors, mappers, and ports used across the application.
- `src/domain` contains the business code and its logic, including entities, use-cases, and repositories, and has no outward dependency: nor on frameworks (NestJS for example).
- `src/domain/use-cases` is like a conductor. It will depend only on `domain` package to execute business logic. `use-cases` should not have any dependencies on `infrastructure` or external libraries.
- `infrastructure` contains all the technical details, configuration, implementation details like adapters, authentication, database configurations, and HTTP controllers, and must not contain any business logic. `infrastructure` has dependencies on `domain`, `use-cases` and frameworks.  

## Domain Layer Structure
The `src/domain` directory encapsulates the core business logic, organized by various domains. Each domain typically includes the following subdirectories:

**entities**: Contains the core business entities or models specific to the domain. These entities represent the main data structures and their behaviors within the domain.
**repositories**: Defines interfaces for data access and persistence. Repositories abstract the data layer, allowing the business logic to interact with various data sources without being coupled to specific implementations.
**use-cases**: Encapsulates the application logic and workflows specific to the domain. Use-cases coordinate user actions and interactions, applying the necessary business rules and orchestrating the necessary operations on entities and repositories.

![](https://fullstackroyhome.files.wordpress.com/2019/03/cleanarchitecture.jpg)

## Installation

```bash
$ pnpm install
```

## Running the Application

```bash
# Development mode
$ pnpm run start

# Watch mode
$ pnpm run start:dev

# Production mode
$ pnpm run start:prod
```

## Testing

```bash
# Unit tests
$ pnpm run test

# End-to-end tests
$ pnpm run test:e2e

# Test coverage
$ pnpm run test:cov
```

## Prisma Commands
```bash 
#  generate Prisma client from schema
$ pnpm prisma generate

# Import existing database schema into the Prisma model 
$ pnpm prisma db pull
```

## Conventional commit:
Commits in this project adhere to [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standards, ensuring clear and readable commit messages.

## API Documentation:
The API documentation is available at `/doc` and is generated using Swagger Open API.
[http://localhost:3001/doc](http://localhost:3001/doc)
Ensure the application is running to view the documentation.


---

### Implementing a New API
- Create a new Controller in `src/infra/http/controllers` with necessary DTOs.
- Define the use-case class in `src/domain/your-domain/use-cases`.
- Add the controller and the use-case to `src/infra/http/http.module.ts`
- Define the Entity class in `src/domain/your-domain/entities`.
- Define the Repository Interface in `src/domain/your-domain/repositories`.
- Implement the Prisma Repository in `src/infra/database/repositories/prisma` 
with the corresponding Prisma Mapper at `src/infra/database/mappers/prisma`.
- Add the Interface Repository and the Prisma Repository to `src/infra/database/database.module.ts`