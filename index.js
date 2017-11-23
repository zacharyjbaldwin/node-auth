const devMode = true;
if (devMode) console.clear();

// THIRD PARTY MODULES
var address = require('ip').address();
var bodyParser = require('body-parser');
var chalk = require('chalk');
var express = require('express');
var hbs = require('hbs');
var mongoose = require('mongoose');
var session = require('express-session');

// USER MODULES AND VARIABLES
var apiRoutes = require('./routes/apiRoutes.js');
var errorHandler = require('./routes/errorHandler.js');
var { keys } = require('./config/keys.js');
var logger = require('./modules/logger.js');
logger.show.success = true;
var port = process.env.PORT || 3000;
var requestLogger = require('./services/requestLogger.js');
var routes = require('./routes/routes.js');

// CLASSES
var MongoStore = require('connect-mongo')(session);

// MONGODB SETUP
var db = mongoose.connect(keys.mongoURI, {
    useMongoClient: true,
    promiseLibrary: global.Promise
});
// mongoose.Promise = global.Promise;

// HANDLE MONGODB ERRORS
db.on('error', console.error.bind(console, 'mongodb connection error'));
db.once('open', () => logger.success('Connected to MongoDB database.'));

// EXPRESS SETUP
var app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: keys.sessionSecret,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// USER DEFINED MIDDLEWARE
app.use(requestLogger);

// HANDLEBARS SETUP
hbs.registerPartials('./views/partials');

// ROUTES
app.use('/api', apiRoutes);
app.use('/', routes);
app.use('/', errorHandler);


app.listen(port, () => {
    logger.info(`Server listening on address: ${chalk.underline(`http://${address}:${port}`)}.`);
});