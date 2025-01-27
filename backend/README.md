## Install dependencies
Run the command: 
```bash
npm install
# or
yarn install
# or
pnpm install
```
## Create a local database
First install docker and run the command:

```bash
  docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo
```
## Enviroment variables
Copy and rename the .env.example file to .env 

## Running application

Run the development server:

```bash
npm run start:dev
# or
yarn run start:dev
# or
pnpm dev
```

