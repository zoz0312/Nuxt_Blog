# nuxt_blog

> AJu Nuxt Blog

## Environment
1. Nuxt
2. MongoDB
3. XML Blog API > https://github.com/zoz0312/Blog_API

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at 0.0.0.0:80
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## config.json
> Must setting server config
``` json
{
	"server":{
		"id": "",
		"pw": "",
		"db_url":""
	},
	"session":{
		"path": "",
		"maxAge": 0,
		"key_sid": "",
		"secret": ""
	}
}
```
| Key1 | Key2 | 의미 |
| :-------- |:--------- | :-------- |
| `server` 	| `id` 			| admin ID |
|						| `pw` 			| admin PW |
|						| `db_url` 	| 접근할 DB URL |
| `session` | `path` 		| session store path |
|						| `maxAge` 	| session Max-Age |
|						| `key_sid` | session sid |
|						| `secret` 	| session secret key |