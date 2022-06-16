# WAW for TypeScript

[![License](https://img.shields.io/github/license/easytechupc/waw-backend-ts)](LICENSE)
[![GitHub Actions](https://img.shields.io/github/workflow/status/easytechupc/waw-backend-ts/node)](https://github.com/easytechupc/waw-backend-ts/actions/workflows/node.yml)
[![License](https://img.shields.io/codecov/c/github/easytechupc/waw-backend-ts?token=90OQ2UEM1L)](https://codecov.io/gh/easytechupc/waw-backend-ts)

## Description

WAW Backend Application, written with [TypeScript](https://www.typescriptlang.org/) and [Nest.js](https://nestjs.com/), powered by [Node.js](https://nodejs.org/).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [recommended extensions from workspace](.vscode/extensions.json).

## Customize configuration

Check the [Nest.js](https://docs.nestjs.com/) and [TypeORM](https://typeorm.io/) docs.

## Project Setup

Install dependencies using:

```bash
npm install
```

Then, create a copy of the [`.env.example`](.env.example) file named `.env` and fill the values needed:

```properties
# Application Settings
PORT=3000
# Database Connection
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_super_secret_password
DB_NAME=your_database_name
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

WAW uses Nest.js, which is a MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
