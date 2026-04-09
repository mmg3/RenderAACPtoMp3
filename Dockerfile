FROM node:20

# Instalar ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Carpeta de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Puerto que usa Render
EXPOSE 10000

# Comando de inicio
CMD ["npm", "start"]