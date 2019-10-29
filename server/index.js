const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const fs = require('file-system');
const logger = require('morgan');
const session = require('express-session');

const post_middle = require('./modules/post');

const sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    secure: true,
    maxAge: 1000 * 60 * 30 // 30Min
  },
  name: 'admin'
}

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';
const server_config = require('/home/ahnhc/config.json');

/*===== S:Node Modules =====*/
app.use(bodyParser.json());
app.use(logger(':remote-addr\t - [:date[iso]] ":method" ":url HTTP/:http-version" :status :res[content-length]', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(logger('dev'));
app.use(session(sess));
/*===== E:Node Modules =====*/

app.use(post_middle);

/*===== S:DB Connection =====*/
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
mongoose.connect(server_config.server.db_url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
/*===== E:DB Connection =====*/

/*===== S:Middle Ware =====*/
const login = require('./routes/login');
const logout = require('./routes/logout');
const write = require('./routes/write');

app.use('/login', login);
app.use('/logout', logout);
app.use('/write', write);
/*===== E:Middle Ware =====*/

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

	/*===== S:Access-Control-Allow =====*/
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
	/*===== E:Access-Control-Allow =====*/


	/*===== S:Methods Block =====*/
  app.options('*', (req, res, next) => {
    res.status(404).end();
    res.end();
  });
	app.head('*', (req, res, next) => {
		res.status(404).end();
		res.end();
	});
	/*===== E:Methods Block =====*/

	app.all('*', (req, res, next) => {
		res.append('modify', 'Made By zoz0312');
		next();
	});

	app.get('*', (req, res, next) => {
		next();
	});

	app.post('*', (req, res, next) => {
		next();
	});

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
