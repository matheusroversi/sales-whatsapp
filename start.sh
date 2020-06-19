#!/bin/sh

ENV=$ENVIRONMENT;
URL=$PUBLIC_URL
cd /frontend;

echo "Starting Node container";

if [ "$ENV" = "dev" ]
then
    PUBLIC_URL=$URL npm start;
else
    npx serve --single  build/;
fi
