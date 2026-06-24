FROM node:20-alpine

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# build step (if TS, otherwise ignore)
# RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]