# Doshii Code Challenge

## Questionnaire

- Questionnaire answers have been included inside `/Questionnaire/README.md`

## Web Application

- Technologies and versions used:
  `NPM - v6.4.1`
  `Node - v10.15.0`
  `MySQL - 5.7.21`

- Setup process:
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

## A Small Web Application

Create a simple application for member rewards.

Endpoints and logic should be created for:

- Creating a member and reward
- Associate a reward to a member
- Retrieve a member and their rewards
- Delete a member and reward

#### Please complete using the following technologies

- NodeJS (ES6) - preferably using version 8 or above
- Any SQL flavour

#### As part of your solution please specify any:

- Software requirements
- Installation instructions
- Assumptions made about the requirements of the task
- Anything you believe is important but out of scope or unnecessary

#### We value

- Good application design
- Clear and readable code
- Tests and testable code
- Decent performance

We would prefer if you created a publicly available repository for the completed work.
