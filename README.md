# express-sequelize-adminjs-swagger

Awesome REST API boilerplate with documentation, admin panel and dev tools

## Prerequisites

Make sure you have the following installed before getting started:

-   [Node.js](https://nodejs.org/en)
-   [Docker](https://www.docker.com/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AlexandrePereon/express-sequelize-adminjs-swagger.git

cd express-sequelize-adminjs-swagger
```

## Setup .env File

To configure your project, you'll need to set up the .env file. Start by creating a copy of the environment variables file:

```bash
cp local.env .env
```

Open the newly created .env file and fill in the necessary values for the following variables:

```bash
#EXPRESS
API_PORT=3000
API_HOST=localhost

#ENVIRONMENT
NODE_ENV=development

#JWT
JWT_SECRET=jwt-key
JWT_TIMEOUT=1h

#DATABASE
DB_DIALECT=mysql
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=Base_Test
DB_PORT=3306
```

## Development

Before starting development, ensure that a MySQL server is running. If you don't have one, you can quickly set up a test MySQL server using Docker:

```bash
docker run --name test-mysql -e MYSQL_ROOT_PASSWORD='DB_PASS' -p 3306:3306 -d mysql:8.0-debian
```

Replace 'DB_PASS' with the password specified in your .env configuration file.

Now, let's set up the database :

1. Create the database:

    ```bash
    npm run db:create
    ```

2. Run the database migrations :

    ```bash
    npm run db:migrate
    ```

3. Set up the admin user :
    ```bash
    npm run db:seed:admin
    ```

Now, you're ready to start the development server:

```bash
npm run dev
```

Remember to check the terminal for any additional information or error messages.

## Deployment with Docker Compose

1. Build Docker images:

```bash
docker compose up -d
```

## Admin Panel and Documentation

### Admin Panel Access

Admin Panel URL : http://localhost:3000/admin

Example Image:

#### Modification Location:

To modify the content of the Admin Panel, navigate to the `src/adminjs` folder. These modifications involve adjusting [AdminJS](https://adminjs.co/) configurations, defining models, and customizing the appearance and behavior of the admin interface.

### API Documentation Access

Swagger Documentation URL : http://localhost:3000/api-docs

Example Image:

#### Modification Location:

To update or modify the API documentation, you can make changes directly to your API routes `routes.ts`. The documentation is generated based on comments using [Swagger](https://swagger.io/). Adjust comments and annotations to enhance and customize the documentation.

## Development Tools

To enhance your development experience, we recommend using the following Visual Studio Code extensions:

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
-   [GitLens - Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
