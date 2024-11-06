lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5001

start:
	npx start-server -s ./frontend/build -p 3000


build:
	rm -rf frontend/build
	npm run build