# ---- Base Node ----
FROM node:alpine AS base
# Copy project file
COPY . .
# Build project
ARG VUE_APP_BRANCH
ENV VUE_APP_BRANCH=$VUE_APP_BRANCH
RUN VUE_APP_BRANCH=$VUE_APP_BRANCH npm run build

# ---- Prod ----
FROM nginx
# Copy needed files
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base dist /usr/share/nginx/html
