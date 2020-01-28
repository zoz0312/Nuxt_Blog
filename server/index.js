const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

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
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(session(sess));
/*===== E:Node Modules =====*/

/*===== S:DB Connection =====*/
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
/*===== E:DB Connection =====*/

/*===== S:DB Models =====*/
const log = require('../models/log');
/*===== E:DB Models =====*/

/*===== S:Middle Ware =====*/
app.use(post_middle);

const api = require('./api/api');
const login = require('./routes/login');
const logout = require('./routes/logout');
const post_list = require('./routes/post_list');
const category = require('./routes/category');
const post = require('./routes/post');
const route_log = require('./routes/log');

app.use('/api', api);
app.use('/login', login);
app.use('/logout', logout);
app.use('/list', post_list);
app.use('/category', category);
app.use('/post', post);
app.use('/log', route_log);
/*===== E:Middle Ware =====*/

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

app.get('*', (req, res, next) => {
	// console.log('GET *', req.session);
	next();
});

app.post('*', (req, res, next) => {
	console.log('post call')
	next();
});

app.all('*', (req, res, next) => {
	res.append('modify', 'Made By zoz0312');
	const req_url = req.url;
	if( /favicon.ico|prism.css|__webpack|\/log/.test(req_url) ){
		next();
	} else {
		const ip = req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
		let schm_log = new log();
		schm_log.err = '';
		schm_log.ip = ip;
		schm_log.time = moment().format('YYYY-MM-DDTHH:mm:ss');
		schm_log.url = req_url;
		schm_log.http_version = req.httpVersion;
		schm_log.http_method = req.method;
		schm_log.user_agent = req.headers['user-agent'];

		schm_log.save().then(result => {
			console.log('result', result);
			next();
		}).catch(err => {
			console.log('err', err);
			next();
		});
	}
});

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
