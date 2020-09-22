# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add app
COPY . ./
# install app dependencies

RUN npm install
# RUN npm build



# start app
CMD ["npm", "start"]