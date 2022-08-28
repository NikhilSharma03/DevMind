## Server Commands

## Install server dependencies on your local machine.
setup-server-libs: 
	cd server; npm install; cd ..

## Run dev server
run-server-dev:
	cd server; npm run server:dev; cd ..

## Run server
run-server:
	cd server; npm run server; cd ..

## ------

## Client Commands

## Install client dependencies on your local machine.
setup-ui-libs: 
	cd client; npm install; cd ..

run-ui: 
	cd client; npm start; cd ..

build-ui: 
	cd client; npm run build; cd ..
