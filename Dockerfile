FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9090

FROM nginx as deploy-stage
WORKDIR /app
COPY --from=build-stage /app/nuxt.config.js ./
COPY --from=build-stage --chown=nuxtjs:nodejs /app/.nuxt ./.nuxt
COPY --from=build-stage /app/dist /usr/share/nginx/html/studiz-student/
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]