# REST Service

## Description

Home Library Service! `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Install

1. Install Node.js

2. Install docker

3. Clone repository

```shell
git clone https://github.com/MaSkA6293/nodejs2022Q4-service
```

4. Go to the project directory

```shell
cd nodejs2022Q4-service
```

5. Switch branch auth

```shell
git checkout auth
```

6. To install all dependencies (be able run tests) use

```shell
npm install
```

## Before running `docker-compose up` rename <code>.env.example</code> to <code>.env</code>

## Running application

Write in the terminal in the root folder:

```shell
docker-compose up
```

## How to check the app

1. Open a new terminal in the root folder and write:

```shell
npm run test:auth
```

2. Use postman to check auth routs
