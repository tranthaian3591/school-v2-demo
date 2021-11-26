FROM node:lts-alpine3.14 AS builder
COPY package.json yarn.lock ./

RUN yarn install

RUN mkdir /host

RUN mv ./node_modules ./host

WORKDIR /host

COPY . .

RUN npm i -g @nrwl/cli

RUN nx run app-phong:build:production

FROM nginx:1.20.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /host/dist/apps/app-phong /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]


