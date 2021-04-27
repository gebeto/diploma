FROM nginx:alpine as development
COPY nginx.dev.conf /etc/nginx/conf.d/default.conf
EXPOSE 89


FROM nginx:alpine as production
COPY nginx.prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 89
