FROM mhart/alpine-node:10

ARG PUBLIC_URL
ARG API_SERVER_ADDRESS
RUN apk add --no-cache make gcc g++ python linux-headers libc6-compat bind-tools git openssh-client
ENV NODE_PATH /frontend/node_modules

RUN mkdir -p /frontend
WORKDIR /frontend


COPY package.json /frontend/package.json
RUN npm install --prefix /frontend

COPY ./start.sh /frontend/start.sh
COPY ./src /frontend/src
COPY ./css /frontend/css
COPY ./public /frontend/public
EXPOSE 3003 3003

RUN npm run build git openssh-client

RUN apk del make gcc g++ python linux-headers

CMD ["sh", "./start.sh"]



#CMD ["tail","-f","/dev/null"]

#CMD ["ls","-la"]
#CMD ["pwd"]
#CMD ["tail","-f","/dev/null"]


#CMD ["npm","run","serve"]

#COPY ./ /app

#RUN cd /app

#RUN npm install --unsafe-perm

#CMD ["ls","-la"]
#    npm run build  && \

 #   npm run build  && \
 #   apk del make gcc g++ python linux-headers
#    rm -Rf  ^/build/

#CMD ["npx","serve","--single", "build/"]
#CMD ["ls","-la"]
