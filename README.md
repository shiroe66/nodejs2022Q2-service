# Home Library Service

## Downloading

```bash
git clone https://github.com/shiroe66/nodejs2022Q2-service.git nodejs2022Q2-service
```

## Installing NPM modules

```bash
cd nodejs2022Q2-service
git checkout develop-docker
npm install
```

## Usage Docker

Run Docker Desktop

After running

```bash
docker-compose up
```

## For Scan Docker

```bash
npm run scan:node
npm run scan:postgres
```

## Running application

Rename .env.example file to .env

```bash
npm start
```
