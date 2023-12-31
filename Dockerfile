FROM node:20

# Create app directory, this is in our container/in our image
WORKDIR /tg-backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /tg-backend/

RUN npm run build

EXPOSE 3001
# CMD [ "node", "dist/main" ]
CMD ["npm", "run", "start:dev"]