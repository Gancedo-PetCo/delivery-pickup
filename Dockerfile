FROM node:10.15.3 as base
RUN mkdir -p /srv/app
COPY . /srv/app
WORKDIR /srv/app
# Install production dependencies
RUN npm install
RUN npm run build_client
# Expose port for access outside of container
ENV PORT 3006
EXPOSE $PORT
CMD ["node", "server/start.js"]
