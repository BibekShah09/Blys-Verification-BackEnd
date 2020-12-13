# Blys Validator
Validator for Blys Code

## Prerequisites
- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install) / [NPM](https://docs.npmjs.com/getting-started/installing-node)

## Setup
Clone the repository, install the dependencies and get started right away.

    $ git clone  <folderName>
    $ cd <folderName>
    $ yarn # or npm install

Make a copy of `.env.example` as `.env` and update your application details.

Finally, start the application.

    $ yarn dev (For development)
    $ yarn start (For production)

Navigate to http://localhost:<PORT_NO>/api/v1 to verify installation.

## Setup Using Docker

Use [docker-compose](https://docs.docker.com/compose/) to quickly bring up a stack.
Data is ephemeral and containers will disappear when stack is removed.

Configuration for Docker is in `.env.docker.example`

Make a copy of `.env.docker.example` as `.env.docker` and update your application details.

- `0.0.0.0` as `$APP_HOST` to expose app on Docker network interface

Bring up stack,

    $ docker-compose up

Navigate to http://localhost:<PORT_NO>/api/v1 to verify installation.

Bring down stack,

    $ docker-compose down
    
## API
Navigate to http://localhost:<PORT_NO>/swagger for API Details.

## Author
[Bibek Shah](https://github.com/BibekShah09)

## License
[MIT](https://choosealicense.com/licenses/mit/)
