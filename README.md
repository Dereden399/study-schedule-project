# Study schedule

A small fullstack web application to plan a study schedule

## Environment variables

You should include some variables in .env file:

1. MONGODB_URI - link to the mongo database for production
2. MONGODB_URI_TEST - link to the test database. Although, the project does not use since as for development build mongo container is utilized
3. VITE_REACT_BACKEND_URL - URL for backend. Used in the frontend

## Running the project

For development in container run this command in the root of the project:

```bash
$ docker-compose -f docker-compose.dev.yml up
```

For production build you can run:

```bash
$ docker-compose up
```

Make sure you delete previous containers if you switch between development and production build.

## Running frontend

For development build run this command in the ./frontend folder:

```bash
$ npm run dev
```

Fo running tests, start the test backend first, then development build, and then:

```bash
$ npm run cypress:open
```

## Running backend

For development build run this command in the ./backend folder:

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

For running tests:

```bash
  // Before the first time
  $ chmod +x run_tests.sh

  $ ./run_tests.sh
```

**NOTE**: On Widnows machines you should use Git Bash or something like this to run a bash script. Otherwise, copy-paste all commands from the script into the terminal one by one

## Technologies used

1. React
2. Typescript
3. Redux Toolkit
4. Chakra UI
5. Express Typescript
6. Cypress
7. Docker
8. Jest
