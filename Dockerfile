FROM node

WORKDIR /icecream

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD npm run start