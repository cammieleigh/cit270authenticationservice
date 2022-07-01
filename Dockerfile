#This is the base image we are inheriting from
FROM node

#Tells the conatiner to start in that directory
WORKDIR /app


#We are copying the package.json file first so that there isn't a conflict with the node_modules directory
COPY package.json ./

RUN npm install

COPY . ./

#Last command needed to start the container
CMD npm start