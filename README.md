# Task manager

This is a fullstack project:

Backend (this page)\
[Frontend](https://github.com/1leha/tg-frontend).

## Description

This is the backend of task manager was developed using the NestJS framework.

I used PostgreSQL database as data storage.\
The project is built into a docker container that contains 3 images: a `backend`, a `database` and `pgAdmin` for watchind of data in database.\
The queries are implemented using graphQL. For data validation I was using the ValidationPipe.\
All user passwords are hashed. User authorization occurs with JWT-token.\
The settings are collected in .env.example.

## Instaling and starting

Download this repo.

Then:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies and libraries

typescript, react, redux, redux-persist, mui, apollo, graphql, formic, yup,
date-fns, toastify
