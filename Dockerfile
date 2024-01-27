# Use uma imagem base com suporte ao Node.js
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos do aplicativo para o contêiner
COPY package*.json ./
COPY . .

# Instale as dependências
RUN npm install

# Construa o aplicativo
RUN npm run build

# Comando para iniciar o aplicativo
CMD [ "npm", "run", "serve" ]
