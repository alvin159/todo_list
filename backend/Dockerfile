# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# copy package files first for better caching
COPY package.json package-lock.json* ./ 
# if you use yarn, adjust accordingly

RUN npm install --production

# copy the rest of your backend code
COPY . .

# expose port
EXPOSE 3010

# use environment vars for config (Docker Compose will provide them)
CMD ["node", "server.js"]
