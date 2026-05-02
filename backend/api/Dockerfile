FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (Cloud Run sets PORT env var automatically, but we use 8081 as default)
EXPOSE 8081

# Command to run
CMD ["npm", "start"]
