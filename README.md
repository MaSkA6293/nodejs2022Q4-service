# REST Service

## Description

Home Library Service! `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Install

1. Install Node.js

2. Clone repository

```
git clone https://github.com/MaSkA6293/nodejs2022Q4-service
```

3. Switch branch <code>develop</code>
4. To install all dependencies use <code>npm install</code>

## Before running app

1. Rename <code>.env.example</code> to <code>.env</code>

## Running application

1. Production mode:

```
npm start
```

2. Development mode

```
npm run start:dev
```

The app will be running on <code>http://localhost:4000/</code> by default

## To get information about REST Service

1. Go to SWAGGER editor <code>https://editor.swagger.io/</code>
2. Copy <code>[code](./doc/api.yaml)</code> and paste it into editor

## Use Postman collection to test REST Service

Import the collection in Postman: <code>[postman collection](./rest%20service%20nodeJS%20task.postman_collection.json)</code>

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
