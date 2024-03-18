# Renec Videos Project

## Introduction

An entertainment-space where you could share you favourite or interesting YouTube videos with your friends.

**Key features:**

- Create account and login to start joining the space.
- Watch shared YouTube videos.
- Share YouTube video you prefer via YouTube url.
- Like and dislike video.

## Prerequisites

The following tech stacks are being used for the project. You don't need to install any of these locally because this project is using Docker to initialize containers inside which the corresponding packages/libraries were installed. This list is only for the project knowledge.

### Front-end

- [Typescript - v5.2.2](https://www.typescriptlang.org/): a superset of Javascript, the language being used for FE.
- [React - v18.2.0](https://react.dev/): the SPA library.
- [Vite - 5.1.6](https://vitejs.dev/): build tool for our project, contains dev server and build process. A substitute for create-react-app tool.
- [TailwindCSS - v3.4.1](https://tailwindcss.com/): a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90`, etc.
- [Shadcn UI](https://ui.shadcn.com/): a collection of re-usable components that can be copied and pasted in the project.

### Back-end

- [Go - v1.22.1](https://go.dev/): the language being used for BE.
- [Gin - v1.9.1](https://gin-gonic.com/): the web framework handling routing, requests and responses.
- [Gorm - v1.25.7](https://gorm.io/): the ORM library for GO lang.

### Database

- Postgres

## Running the App

Since the project leverages Docker for its pipelines, you need to make sure your Docker is installed and being run in your machine.
Following this [instructions](https://docs.docker.com/engine/install/) to install Docker Engine or this [instructions](https://docs.docker.com/desktop/install/mac-install/) to install Docker Desktop.
Make sure to install [docker compose](https://docs.docker.com/compose/install/) as well (although you will have docker compose included if you install Docker Desktop)

After you get Docker Engine / Desktop up and running:

1. Go to any favour directory in your machine for the project location.

2. Clone the project from the github repo using command:

```
git clone https://github.com/trungnd3/remitano-videos.git
```

3. Change to the cloned project directory and open terminal.

4. Create external volume for postgres container:

```
docker volume create dbremitano
```

5. Run the following command to start the docker containers in daemon mode (free your terminal after start):

```
docker compose -f docker-compose-dev.yml up -d --build
```

Or, you could run the command without `-d` flag to have the terminal following the logs:

```
docker compose -f docker-compose-dev.yml up --build
```

If you want to stop the docker containers, run this command:

```
docker compose -f docker-compose-dev.yml down
```

6. After few miniutes the project will up and run via `localhost:3050`. The terminal will also running the test suites in watch mode.

## Usage

1. The first time visit the app via `localhost:3050`, you will be directed to the Login screen

2. Login with your existing account our register new one.

3. After login, you will be redirected to the Home page with the list of videos

4. Click on any video to go to the Play page where you could watch it.

5. On the top right corner, you go to Share page by clicking AddPicture icon.

6. Also on the top right corner, click on the avatar to open sidebar, you could see more option here such as logout.

7. On the Home page or Play page, you could like or dislike the video.

## Troubleshooting

1. On step 5 of **Running the App** section, when running docker compose to start the app, there is a potential issue related to `registry-1.docker.io` connection:

```
failed to solve: node:18-alpine: failed to do request: Head "https://registry-1.docker.io/v2/library/node/manifests/18-alpine": dialing registry-1.docker.io:443 with direct connection: connecting to 2600:1f18:2148:bc01:571f:e759:a87a:2961:443: dial tcp [2600:1f18:2148:bc01:571f:e759:a87a:2961]:443: connect: no route to host
```

If you see this error message, restart your Docker Engine / Desktop and run the docker compose command again.
