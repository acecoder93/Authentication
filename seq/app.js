var express = require('express'); // related to express; npm install express
var app = express(); // initializing express
var session = require('express-session'); // related to session; npm install express-session
var cookie_parser = require('cookie-parser'); // related to cookie-parser; npm install cookie-parser
var db = require('./models'); // related to sequelize and directed to index file ; npm install sequelize (refer to documentation for additional package installation)

app.use(session({ // to use, need to require session
    secret: 'some-special-secret',
    resave: false,
    proxy: true,
    store: myStore // to utilize need to do npm install sequelize-session-store
}));



app.listen(4000, ()=>{
    console.log('listening to port 3000');
});