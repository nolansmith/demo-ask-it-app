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
`Definitely change the MYSQL variables to match your credentials, you may need to modify the HTTP/HTTPS ports due to permissions`
### Generate SSL Certificate
You'll need to put your key and your cert in `src/server/services/https` directory

## Database

### Set Up Database (create tables, seed fake data)
`npm run migrate`

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
