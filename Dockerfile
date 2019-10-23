# ---- Base Node ----
FROM node:alpine AS base
# Copy project file
COPY . .
ENV TRAVIS_BRANCH=$TRAVIS_BRANCH
# Build project
RUN npm run build

# ---- Prod ----
FROM nginx
# Copy needed files
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base dist /usr/share/nginx/html
