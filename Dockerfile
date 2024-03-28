FROM node:18

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

RUN ng build --configuration=production

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4400", "--configuration=production"]
