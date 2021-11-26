# We're using a multi-stage build so that we can install dependencies during build-time only for production.

# The build image

FROM node:14-alpine as builder

WORKDIR /app

COPY . /app/.

RUN npm install

RUN npm run build


# The production image

FROM ubuntu

RUN apt-get update && \
apt -y install curl && \
apt-get install -y software-properties-common wget curl && \
curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
apt-get install -y nodejs && \
apt-get autoremove -y && \
apt-get clean && \
apt-get autoclean



RUN npm install pm2 -g

RUN mkdir /app/

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app /app

RUN npm ci --only=production

EXPOSE 9000

CMD ["npm", "start"]

