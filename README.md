# Task manager

This is a fullstack project:

Backend (this page)\
[Frontend](https://github.com/1leha/tg-frontend).

## Description

This is the backend of task manager was developed using the NestJS framework.

I used PostgreSQL database as data storage.\
The project is built into a docker container that contains 3 images: `backend`, `database` and `pgAdmin` for watchind of data in database.\
The queries are implemented using graphQL. For data validation I was using the ValidationPipe.\
All user passwords are hashed. User authorization occurs with JWT-token.\
The settings are collected in .env.example.

## Instaling and starting

Download this repo.

Start and login to your Docker.

Then:

### `docker-compose up -b`

Builds and runs the app in the development mode inside docker container.

### `docker-compose up`

Runs the app in the development mode inside docker container. You have to build images at first!

### `npm run start:dev`

Runs the app in the development mode. You must to start your docker container with PostgreSQL.\
Server adress by default: [http://localhost:3001](http://localhost:3001).\
GraphQL server : [http://localhost:3001/graphql](http://localhost:3001/graphql).

## Technologies and libraries

typescript, nestjs, pg, apollo, graphql, typeorm, passport, bcryptjs, class-transformer, class-validator
