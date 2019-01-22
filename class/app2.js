const express = require('express');
const app = express();
const sessions = require('express-session');


// to create session; use middleware
app.use(sessions({
    secret: 'this-is-my-secret',
    cookie : {maxAge: 14*24*60*60*1000}
}));

// developing routes
app.get('/', (req,res)=>{
    
    req.session.someAttribute = "digitalCrafts"

    res.send('Helo World');
});
app.get('/test', (req,res)=>{

    
    res.send(req.session.someAttribute);
});



app.listen(5000, ()=>{
    console.log('Listening on port 5000');
});