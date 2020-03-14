FROM node:12.16.1-stretch-slim
WORKDIR /usr/app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]