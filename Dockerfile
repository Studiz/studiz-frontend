FROM node:16.16.0-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run generate
CMD ["npm", "run", "dev"]
EXPOSE  80