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

5. Switch branch database/ORM

```shell
git checkout database/ORM
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
npm run test
```

2. To check vulnerabilities:

- scan app image

```shell
npm run scan:app
```

- scan db image

```shell
npm run scan:db
```

## The image is pushed to DockerHub

The [images](https://hub.docker.com/repository/docker/812857b74d26/nodejs2022q4-service/tags?page=1&ordering=last_updated)

To get app image:

```shell
docker pull 812857b74d26/nodejs2022q4-service:app
```

To get db image:

```shell
docker pull 812857b74d26/nodejs2022q4-service:db
```
