FROM node:16-alpine
 
# Create app directory
WORKDIR /usr/src/app

# Copy compiled files into the app directory of the container
COPY ./dist/ .

RUN npm install

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map
RUN rm -rf node_modules/couchbase/src/

EXPOSE 3000
CMD [ "node", "src/app.js" ]