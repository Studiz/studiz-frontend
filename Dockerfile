FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
# COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 9090

FROM nginx:latest as deploy-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/dist/studiz-student /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]