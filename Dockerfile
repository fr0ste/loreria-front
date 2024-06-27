# Etapa 1: Construcción del proyecto Angular
FROM node:22 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos compilados de la aplicación Angular desde la etapa de construcción
COPY --from=build /app/dist/loreria-front /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que Nginx estará sirviendo la aplicación
EXPOSE 80
# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
