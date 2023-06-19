# Study schedule

A small fullstack web application to plan a study schedule

## Running backend

For development build run this command in the ./backend folder:

```bash
$ docker-compose -f docker-compose.dev.yml up
```

For running tests:

```bash
$ docker-compose -f docker-compose.test.yml up --abort-on-container-exit && docker logs backend-server-1
```

## Technologies used

1. Express typescript
2. Mongodb
3. Docker
4. Jest

## Database structure

### User

1. username
2. password
3. schedule list

### Schedule

1. course list
2. name
3. description
4. user id

### Course

1. name
2. starting date
3. end date
4. additional info
5. user id
