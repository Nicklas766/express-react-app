# express-react-app
[![Build Status](https://travis-ci.org/Nicklas766/express-react-app.svg?branch=master)](https://travis-ci.org/Nicklas766/express-react-app)
[![Maintainability](https://api.codeclimate.com/v1/badges/af621816f97867ab0b1c/maintainability)](https://codeclimate.com/github/Nicklas766/express-react-app/maintainability)

[![Build Status](https://scrutinizer-ci.com/g/Nicklas766/express-react-app/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/express-react-app/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Nicklas766/express-react-app/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/express-react-app/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Nicklas766/express-react-app/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/express-react-app/?branch=master)

This is my application for the course [ramverk2](https://dbwebb.se/kurser/ramverk2) at Blekinge Tekniska Högskola.

Furthermore I use [express](https://github.com/expressjs/express) for the server and [react](https://github.com/facebook/react) for client.

## Setup

You can setup your own very quickly, just do the following,

```
$ git clone https://github.com/Nicklas766/bth-ramverk2.git
$ cd app
$ npm install
$ npm start
```

## How to use

### Testing
Check dev dependencies in `package.json` (it's
[mocha](https://github.com/mochajs/mocha),
[supertest](https://github.com/visionmedia/supertest),
[enzyme](https://github.com/airbnb/enzyme),
[nyc](https://github.com/istanbuljs/nyc)
)

... and then you can start writing tests in `/test`

```
$ npm test
// OR
$ make test
```

### Client development

```
// step 1, start
$ cd app/client
$ npm install
$ npm start

// step 2, do changes in ../client/app

// step 3, build (save changes for production ready app)
$ cd app/client
$ npm run build
```
