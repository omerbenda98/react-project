# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy built files from builder stage   
COPY --from=builder /app/build /usr/share/nginx/html
# Add nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]