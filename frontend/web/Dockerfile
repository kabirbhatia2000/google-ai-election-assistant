FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build Next.js
# Note: We need BASE_URL if used during build, but rewrites are runtime (unless SSG)
RUN npm run build

# Expose port (Cloud Run sets PORT env var automatically, default 3000)
EXPOSE 3000

# Command to run
CMD ["npm", "start"]
