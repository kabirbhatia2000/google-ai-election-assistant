# --- Stage 1: Build Frontend ---
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend/web
COPY frontend/web/package*.json ./
RUN npm install
COPY frontend/web/ .
# Fix for the type error we found earlier (just in case)
RUN sed -i 's|@/src/services/api|@/services/api|g' src/features/onboarding/OnboardingForm.tsx || true
RUN npm run build

# --- Stage 2: Build Backend ---
FROM node:20-slim AS backend-builder
WORKDIR /app/backend/api
COPY backend/api/package*.json ./
RUN npm install
COPY backend/api/ .
RUN npm run build

# --- Stage 3: Runtime ---
FROM node:20-slim
WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend/api/package*.json ./
RUN npm install --production
COPY --from=backend-builder /app/backend/api/dist ./dist

# Copy frontend static files to the location expected by backend
COPY --from=frontend-builder /app/frontend/web/out ./public

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
