FROM ubuntu

RUN apt-get update && \
apt -y install curl && \
apt-get install -y software-properties-common wget curl && \
curl -fsSL https://deb.nodesource.com/setup_15.x | bash - && \
apt-get install -y nodejs && \
apt-get autoremove -y && \
apt-get clean && \
apt-get autoclean

RUN npm install pm2 -g

WORKDIR app

COPY .  /app/.
RUN mkdir -p /app/public/upload/temp_files
RUN mkdir -p /app/public/cache/temp
RUN mkdir -p /app/public/logs/queries
RUN mkdir -p /app/public/logs/requests


RUN npm install

RUN npm run build



EXPOSE 3000


CMD [ "pm2-runtime", "start", "ecosystem.config.js"]

