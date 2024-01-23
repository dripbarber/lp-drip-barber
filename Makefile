up:
	COMPOSE_HTTP_TIMEOUT=1000 docker-compose up -d

build:
	docker-compose build --no-cache

restart:
	docker-compose restart

down:
	docker-compose down

logs:
	docker-compose logs -f

bash:
	docker-compose exec voice-frontend sh
