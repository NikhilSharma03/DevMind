## Development Server commands
.PHONY: setup-server-libs
setup-server-libs:
	@echo "Installing server dependencies"
	npm install

.PHONY: run-server-dev
run-server-dev:
	@echo "Starting development server"
	npm run dev

.PHONY: run-server
run-server:
	@echo "Starting server"
	npm run clean
	npm run build
	npm run start

## Development Server docker compose commands
DOCKER_COMPOSE_DEV_FILE=docker-compose-dev.yml
DOCKER_COMPOSE_DEV_SERVER_SERVICE=devmind_api

.PHONY: compose-dev-build
compose-dev-build:
	@echo "Running Devmind API docker compose dev build"
	docker compose -f $(DOCKER_COMPOSE_DEV_FILE) build

.PHONY: compose-dev-up
compose-dev-up:
	@echo "Running Devmind API docker compose dev up in detach mode"
	docker compose -f $(DOCKER_COMPOSE_DEV_FILE) up -d

.PHONY: compose-dev-logs
compose-dev-logs:
	@echo "Running Devmind API docker compose dev logs"
	docker compose -f $(DOCKER_COMPOSE_DEV_FILE) logs $(DOCKER_COMPOSE_DEV_SERVER_SERVICE) -f

.PHONY: compose-dev-down
compose-dev-down:
	@echo "Running Devmind API docker compose dev down"
	docker compose -f $(DOCKER_COMPOSE_DEV_FILE) down


## UI commands
.PHONY: setup-ui-libs
setup-ui-libs:
	cd ui; npm install; cd ..

.PHONY: run-ui-dev
run-ui-dev:
	cd ui; npm start; cd ..

.PHONY: build-ui
build-ui:
	cd ui; npm run build; cd ..
