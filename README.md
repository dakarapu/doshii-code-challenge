# Doshii Code Challenge

## Questionnaire

- Questionnaire answers have been included inside `/Questionnaire/README.md`

## Web Application

- **Technologies and Versions Used** :

  - `NPM - v6.4.1`
  - `Node - v10.15.0`
  - `MySQL - 5.7.21`

- **Setup process** :

  - Install above mentioned dependencies.
  - use `npm install` to install project dependencies.
  - create dev and test databases, a dump file is include `/db_dumps/schema.sql` to execute script.
  - schema.sql will create 2 databases, `doshii` for dev and `doshii_test` for test.
  - config folder includes dev config `/config/default.json` and test config `/config/test.json`.
  - you can change the config based on env for host, username, and password
  - app config is set from npm scripts in `package.json` file.
  - use `npm start` to start the application on port `3006`.
  - use `npm test` to execute test cases that includes both unit tests and integration tests.
  - use `npm test:coverage` to get the code coverage, this will create a coverage folder inside project.

- **Application details** :

  - Maintained `ES6` standard for application implementation.
  - Used `Express` framework for building APIs and `Babel` for to support ES6.
  - Used `Nodemon` to detect code changes and automatic app restart.
  - Used `Jest` framework for testing the application and code coverage.
  - Used `SuperTest` library for testing the HTTP request.
  - Used `@hapi/joi` library for object schema validation.
  - Used `morgan` library for HHTP request logging on console.
  - Used `config` library for application configuration control in different environments.
  - Used `mysql` driver to connect to database.
  - Used `npm-run-all` cli tool to run multiple npm-scripts in parallel.

- **Application access** :

  - Base url for application `http://localhost:3006`

  - **Member endpoints** :

    - **GET** :

      1. `/members` - for getting all members

      ```
      ex:  http://localhost:3006/members
      ```

      2. `/members/:id` - for getting a member with ID

      ```
      ex: http://localhost:3006/members/100
      ```

    - **POST** :

      1.  `/members` - to create new member in database with request body as JSON object. Request body must contain `{id:number, name:string}` both are required with name 3 minimum characters long.

      ```
      ex: { id: 201, name: "johnny" }
      ```

    - **DELETE** :

      1. `/members/:id` - to delete an existing member

  - **Reward endpoints** :

    - **GET** :

      1. `/rewards` - for getting all rewards

      ```
      ex:  http://localhost:3006/rewards
      ```

      2. `/rewards/:id` - for getting a reward with ID

      ```
      ex: http://localhost:3006/rewards/500
      ```

    - **POST** :

      1. `/rewards` - to create new reward in database with request body as JSON object. Request body must contain `{id:number, name:string}` both are required with name 3 minimum characters long.

      ```
      ex: { id: 500, name: "REWARD_1" }
      ```

    - **DELETE** :

      1. `/rewards/id` - to delete an existing reward

  - **Member-Reward Association endpoints** :

    - **POST** :

      1. `/members/:memberId/rewards/:rewardId` - to add an existing reward on to an existing member.
         For successfully adding reward to member, make sure both member and reward exist.

      ```
      ex: http://localhost:3006/members/100/rewards/500
      ```

  - **Note** :

    - To check a member and their reward you must first add reward to member.
    - Use `/members/:id` endpoint to check member and their rewards.
    - If a member is deleted then his associated rewards will also be deleted but not the reward itself.
    - If a reward is deleted then all its associated member data is also delete but not the members.
