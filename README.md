# Home Library Service

## Downloading

```bash
git clone https://github.com/shiroe66/nodejs2022Q2-service.git nodejs2022Q2-service
```

## Installing NPM modules

```bash
cd nodejs2022Q2-service
git checkout develop
npm install
```

## Running application

Rename .env.example file to .env

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

To run all tests without authorization

```bash
npm run test
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```
