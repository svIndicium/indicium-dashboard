# ---- Base Node ----
FROM node:alpine AS base
# Copy project file
COPY . .
# Build project
RUN echo $VUE_APP_BRANCH
RUN VUE_APP_BRANCH=$TRAVIS_BRANCH npm run build

# ---- Prod ----
FROM nginx
# Copy needed files
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base dist /usr/share/nginx/html
