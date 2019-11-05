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
const FileStore = require('session-file-store')(session);

const server_config = require('/home/ahnhc/config.json');
const post_middle = require('./modules/post');

const file_store_opt = {
  path: server_config.session.path,
  ttl: server_config.session.maxAge
}
const sess = {
  store: new FileStore(file_store_opt),
  key: server_config.session.key_sid,
  secret: server_config.session.secret,
  resave: false,
  saveUninitialized: false
}

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

/*===== S:Node Modules =====*/
app.use(bodyParser.json());
app.use(logger(':remote-addr\t - [:date[iso]] ":method" ":url HTTP/:http-version" :status :res[content-length]', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(logger('dev'));
app.use(session(sess));
/*===== E:Node Modules =====*/

/*===== S:DB Connection =====*/
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
/*===== E:DB Connection =====*/

/*===== S:Middle Ware =====*/
app.use(post_middle);

const api = require('./api/api');
const login = require('./routes/login');
const logout = require('./routes/logout');
const post_list = require('./routes/post_list');
const category = require('./routes/category');
const post = require('./routes/post');

app.use('/api', api);
app.use('/login', login);
app.use('/logout', logout);
app.use('/list', post_list);
app.use('/category', category);
app.use('/post', post);
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
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
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
    // console.log('GET *', req.session);
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
