# OnlyJobs
> A job application portal following REST principles, built with the MERN stack.

## About
> A Job Application Portal following where usershave the option to search and apply for various job profiles while showcasing their skillset.
At the same time, recruiters from various companies have the ability to create job listings based on their requirement for various skill sets, experiences.

## Requirements
- NodeJS
- npm/yarn

## Running the app
### Server
- Install dependencies: `npm i --prefix=backend/`
- Run server: `npm start --prefix=backend/`  
The custom start script uses nodemon and babel-node internally to support ES6+ syntax,
using which this Express server has been written.

A `.env` file following the provided `.env.example` is required for MongoDB connection and signing JWTs.

### Client
- Install dependencies:; `npm i --prefix=frontend/`
- Run dev server: `npm start --prefix=frontend/`


#### Note
The React App is set up to proxy API requests to port 5000, so running the backend elsewhere will result in errors.
