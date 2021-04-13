# NodeJS + PostGres Demo project

The purpose of this repo is to provide examples and familiarity with common utilities and scenarios likely to be seen on client work. 

Common scenarios encapsulated are:

* API development with basic CRUD operations
* Client Service that integrates with external API
* Test Suites in Mocha/Chai and Jest
    * Full Integration tests
    * Unit Tests
    * Integration-like tests with stubbed responses
* Connection to PG database using two different utilities
    * PG Client
    * Sequelize -- favored moving forward

## Project Set up

1. To get the project running, you should have NodeJS v14.^ installed. Earlier version may cause problems. 
2. You will need a PostGres server to connect to. For this, you have two options:
    1. Docker
        * utilize the Docker-compose.yml file included in this repo. 
        * Simply enter the command "docker-compose up -d" from the root of the project while Docker is running on your machine 
        * necessary images should download and start both a PG DB server and a GUI available at http://localhost:8080/
    2. Download PG Admin
        * This will install a local PG DB with a GUI client on your machine. 
        * You may have to reconfigure your connection files in connection.ts and sequelizeConnection.ts
3. There are several scripts available in package.json to get the project running ("npm run script_name"):
    1. build - compiles typescript into a dist directory
    2. start - compiles and runs project without watching
    3. watch - compiles ts and watches your ts files
    4. test - runs tests in the Jest directory
    5. test-mocha runs test in the Mocha directory
4. Once project runs, it should be available on localhost:3000. You will primarily use Postman for hitting endpoints, but you should also hit localhost:3000 to initialize the DB. 



