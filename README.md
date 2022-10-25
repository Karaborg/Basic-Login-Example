## Start With ***Dockerfile***

- **To Start Application**
  - Create Network
    - `docker network create <networkName>`
  - Run Mongo
    - `docker run -d --rm --network <network> --name <mongoContainerName> -e MONGO_INITDB_ROOT_USERNAME=<dbUserName> -e   MONGO_INITDB_ROOT_PASSWORD=<dbPassword> mongo`
  - Configure MongoDB Variables
    - `echo 'MONGO_DB_USERNAME=<dbUserName>' >> .env`
    - `echo 'MONGO_DB_PASSWORD=<dbPassword>' >> .env`
  - Build Node Image
    - `docker build -t <nodeImageName> .`
  - Run Node
    - `docker run -p 3000:3000 --rm -d --name <nodeContainerName> --network <networkName> <nodeImageName>`
- **To Stop Application**
  - Stop Node
    - `docker stop <nodeContainerName>`
  - Stop Mongo
    - `docker stop <mongoContainerName>`
  - Remove Images
    - `docker rmi mongo node`
  - Remove Network
    - `docker network rm <networkName>`

> Port can be changed with `echo 'NODE_PORT=<port>' >> .env` command.
