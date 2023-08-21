# Study schedule

A small fullstack web application to plan a study schedule

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

1. Express typescript
2. Mongodb
3. Docker
4. Jest
