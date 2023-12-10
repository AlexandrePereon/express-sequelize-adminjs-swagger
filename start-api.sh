#!/bin/bash

npm run db:create
npm run db:migrate
npm run db:seed:admin
npm start
