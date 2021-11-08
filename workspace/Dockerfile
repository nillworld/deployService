
FROM python:3.9
LABEL name="tobesoft@tobesoft.com"
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install
ENV NODE_ENV development
EXPOSE 3000 80
CMD undefined
