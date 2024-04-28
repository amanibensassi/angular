
#stage 1
FROM node:20.11 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/angular-frontend /usr/share/nginx/html
