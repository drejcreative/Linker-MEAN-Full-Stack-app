# Gulp Workflow
![Project Login](linker.jpg)
![Project Dashboard](linker1.jpg)

MEAN stack app. The MEAN stack is MongoDB, Express.js, AngularJS, and Node.js. Because all components of the MEAN stack support programs written in JavaScript, MEAN applications can be written in one language for both server-side and client-side execution environments.

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API. They contain
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `public/` - AngularJS front-end application files with Gulp workflow.

##Instructions

Make sure you have these installed
1. [Node.js](www.nodejs.org).
2. [git](www.git-scm.com).
3. [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community).
3. Gulp via the Mac terminal or CMD on a PC > `npm install --global gulp-cli`

Clone this repository into your local machine using the terminal (mac) or CMD (PC)
`git clone https://github.com/drejcreative/Gulp-Workflow.git`

CD to the folder with workflows
Run > `npm install` to install the project dependencies
Run > `npm install`  in `public` folder to install front-end project dependencies
Start Mongo locally `C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe` pm PC or
run > `npm run dev` to start the node server
run > `gulp` inside `public` folder to start gulp server for front-end

For creation of Production ready AngularJS app, please type `gulp build` inside `public` folder, and optimized and minify app will be created inside `dist` folder
