# Original Code from https://dev.to/aws-builders/containerize-react-app-with-docker-for-production-572b

FROM node:18-alpine as build
WORKDIR /app
COPY . /app
# https://github.com/yarnpkg/berry/issues/4629
RUN yarn set version canary
RUN yarn
RUN yarn build

FROM nginx:1.23.1-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80