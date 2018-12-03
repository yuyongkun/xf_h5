#! /bin/bash

# build
npm run build

# deploy built files
scp -r ./dist/static webedit@120.76.54.130:/data/apps/fxshop-h5/test
scp ./dist/index.html webedit@120.76.54.130:/data/apps/fxshop-h5/prod
