# SimpleStudy WebApp
This is the monorepo of SimpleStudy web app.

[Frontend Code](./frontend)

[Backend Code](./backend)

---
## Copy environment files

```bash
$ cp frontend/.env.example frontend/.env
$ cp backend/.env.example backend/.env
```

## Unzip database dump file

   Unzip the database dump file that will be used to create the mysql container.

   ```bash
   gunzip -c docker/configs/mysql/init/simplestudy-dump.sql.gz > docker/configs/mysql/init/simplestudy-dump.sql
   ```
## Start Docker Container

   The database container will be created using the dump file that was unzipped in the previous step.

   ```bash
   docker-compose up --build -d
   ```

## Install

Install PNPM globally
```bash
$ sudo npm install -g pnpm
```

Install dependencies
```bash
$ pnpm install
$ cd backend && pnpm prisma generate && cd .. # Generate Prisma client
```

## Running the app

```bash
# development
$ pnpm dev
```
You should be able to access it using: http://localhost:3000

## Starting Storybook
```bash
$ pnpm storybook
```
You should be able to access it using: http://localhost:6006
   
## Conventional commit:
This project uses [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary), the git hook validates all the commit messages with this standard.

Here are some examples of commit messages following the conventional commits format in a monorepo:
```bash
feat(backend): add user authentication module
fix(frontend): resolve button alignment issue on login page
docs(backend): update API documentation for user endpoints
chore(ci): add GitHub Actions workflow
refactor(frontend): restructure component hierarchy
```

## API Doc:
The API documentation is available at `/doc` and is generated using Swagger Open API.
http://localhost:3001/doc#/
