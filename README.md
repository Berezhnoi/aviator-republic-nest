## Wailand LLC, Aviator Republic backend

## Project setup

```bash
$ npm install
```

## Initial preparations
```bash
$ cp .env-example .env
#fill .env with required credentials for DB and firebase services
$ npx sequelize-cli db:migrate #run migrations to DB 
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
# build project
$ npm run build
# start builded project
$ npm run start:prod
```