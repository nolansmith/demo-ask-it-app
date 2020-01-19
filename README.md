# AskIt App
Full Stack Q/A React app using Sequelize, GraphQL, and Node. 


## About
* A full-stack Question and Answer (Q/A) app utilizing JavaScript (React,Node,Sequelize,Apollo). 
It is basic in nature but demonstrates some key components you might want in a starter app when getting into the JS game. 
It can get exhausting looking at a bunch of todo mvc apps so clone this for something far more stressful and confusing.

## Disclaimer
* Almost nothing in this project is industry standard or best practices. 
There's a lot of inconsistency in the code and a bunch of anti-patterns that are likely frowned upon. 
But I just wanted a working project where the front talks to the back and the back does stuff and sends it to the front. 
There's also quite a few security concerns you'd have to address if you ever took this live.

## Install

### Requirements
`nodejs, MySQL database, motivation`
### Clone
`git clone https://github.com/nolansmith/demo-ask-it-app.git "ask-it"`
### Install Dependencies
`cd ask-it && npm install`
### Copy .exampleenv to .env
`cp .exampleenv .env`
### Modify .env File
Change the `MYSQL_*` variables to match your database credentials, 
Change `HTTP` and `HTTPS` if your permissions don't allow those ports
If not using HTTPS make sure to set `USING_HTTPS=no` and `GRAPHQL_PRODUCTION_URL` is prefixed with `http://`
Set `JWT_SECRET` to a custom 128 character string to use with JSON Web Tokens
### Using HTTPS
Make sure `USING_HTTPS=yes` is in your `.env` file and `GRAPHQL_PRODUCTION_URL` is prefixed with `https://`
You'll need generate a certificate and put the key and your cert in `src/server/services/https` directory

## Database

### Set Up Database (create tables)
`npm run migrate`

### Seed Fake Data (optional)
`npm run seed`

### Undo Database Set Up (remove all data, if you want fresh start)
`npm run rollback`

## Application

### Development (run this while you're coding, port 8080)
`npm run start:dev`

### Production (run this when you're done coding, port 3000)
`npm run start:prod`

## ToDo (some ideas)

### Users
* Ability to perform CRUD on all user actions via dashboard (questions,answers)
* Forgot password feature
* Friends list
* Messenger/Who's online
* Upload avatar
### Questions
* Make categories/tags
* Enhance question editor to include formatting
### Search
* Users
* Questions
### Security
* Server-side session information vs localStorage
* Https
* DB encryption
