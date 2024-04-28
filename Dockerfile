FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --force
COPY . .
RUN npm run build --force

FROM nginx:alpine
COPY src/nginx/etc/conf.d/default.conf etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/back-test /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
