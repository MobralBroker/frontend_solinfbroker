#Estágio de compilação
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Estágio de produção
FROM nginx:stable-alpine as production-stage
#Inclua o arquivo de configuração personalizado no diretório de trabalho do Nginx no estágio de compilação
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
