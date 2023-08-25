FROM node:19-alpine AS base

WORKDIR /usr/src/app

COPY . .

RUN npm ci



#FROM base AS test-stage

#ENV CI=true

#RUN npm run test


FROM base AS build-stage

RUN npm run build



FROM node:19-alpine AS prod-stage

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/dist ./build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-p", "5173"]
