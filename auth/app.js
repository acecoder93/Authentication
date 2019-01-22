// Requiring modules
const express = require('express'); // npm install express
const app = express();
var db = require('./models/');

// EJS views setup ; npm install ejs
app.set('view engine', 'ejs');
app.set('views', 'views');


// Also install npm install pg, npm install pg-hstore
// Passport
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport'); // npm install passport , npm install passport-local
var cookieParser = require('cookie-parser'); // npm install cookie-parser
var bodyParser = require('body-parser'); // npm install body-parser
var session = require('express-session'); // npm install express-session
var bcrypt = require ('bcryptjs'); // npm install bcryptjs
var Sequelize = require('sequelize'); // npm installs sequelize

var SequelizeStore = require('connect-session-sequelize')(session.Store) // npm install connection-session-sequelize

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());


// Routes
app.use(require('./routes/index'));
app.get('/register', (req,res)=>{
    res.render('register')
});
app.post('/register', (req,res)=>{
    let pwe = bcrypt.hashSync(req.body.password,8);
    // db.user refers to name of file within model
    db.user.create({username: req.body.username, password:pwe})
    .then((result)=>{
        res.redirect('/login')
    });
});
app.get('/login', (req,res)=>{
    res.render('login');
});
app.get('/login', (passport.authenticate('local', {successRedirect: '/',
                                                    failureRedirect: '/login'})));

passport.use(new LocalStrategy((username, password, done)=>{
    // console.log('Im inside of my local strategy');
    db.user.findAll({where:{username: username}})
    .then(results)=>{
        console.log("a result was found");
        console.log(results);
        if(results != null){
            let data = results[0];
            bcrypt.compare(password, data.password, (err, res)=>{
                if(res){
                    done(null,{id: data.id, username: data.username})
                }
            })
       

        } else{
            console.log("nothing was found");
            done(null,false);
        }
    }
}));

app.get('/dashboard', (req,res)=>{
    if(!req.isAuthenticated()){
        res.redirect('/login');

        return;
    }
    res.send('you are authenticated and you can see this page');
});

app.get('logout', (req,res)=>{
    req.session.destroy((err)=>{
        req.logout();

        res.sendStatus(200);
    })
})

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id, done)=>{
    db.user.findById(parseInt(id,10))
    .then((data)=>{
        done(null, data);
    })
});




// Passport Config
app.use(passport.initialize());
app.use(passport.session());


// Set-Up Sessions
var myStore = new SequelizeStore({
    db: db.sequelize
});

app.use(session({
    secret: 'asdasd',
    store: myStore,
    proxy: true,
    resave: false
}));

myStore.sync();

// Server Listening
app.listen(3000, ()=>{
    console.log('listening on port 3000')
});