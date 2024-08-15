FROM node:18-alpine

WORKDIR /usr/app

# first copy just the package and the lock file, for caching purposes
COPY package.json ./
COPY yarn.lock ./

# install dependencies
RUN yarn

# copy the entire project
COPY . .

# build
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]
