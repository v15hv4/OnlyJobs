<p align="center">
<img src="https://cdn.discordapp.com/attachments/785528722882560030/804355587017408592/onlyjobs_full.svg" height="150px"/>
<br>
A job application portal following REST principles, built on a MERN stack.
</p>

## About
> A Job Application Portal following where users have the option to search and apply for various job profiles while showcasing their skillset.
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
