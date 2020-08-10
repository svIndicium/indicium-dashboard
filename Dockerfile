# ---- Base Node ----
FROM node:alpine AS base
# Copy project file
COPY . .
# Build project
ARG MODE=live
ENV MODE=$MODE
RUN yarn build-$MODE

# ---- Prod ----
FROM nginx
# Copy needed files
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base dist /usr/share/nginx/html
