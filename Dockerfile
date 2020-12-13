FROM node:12

# Port to listen on
EXPOSE 8848

# Copy app and install packages
WORKDIR /app
COPY . /app/

RUN yarn global

# Default app commands
ENTRYPOINT ["yarn"]
CMD ["run", "start"]
