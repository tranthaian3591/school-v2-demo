FROM node:lts-alpine3.14 AS builder
COPY package.json yarn.lock ./

RUN yarn install

RUN mkdir /remote

RUN mv ./node_modules ./remote

WORKDIR /remote

COPY . .

RUN npm i -g @nrwl/cli

RUN nx run features-app-cn-danhmuc:build:production

FROM nginx:1.20.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /remote/dist/apps/features/app-cn-danhmuc /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
