const server_config = require('/home/ahnhc/config.json');

function lib(){
	this.rtn = {
		success:false,
		data : null,
		succ_desc : '',
		err_desc : ''
	};
	this.rtn_result = () => {
		const rtn_tmp = Object.assign({}, this.rtn);
		this.rtn.success = false;
		this.rtn.data = null;
		this.rtn.succ_desc = '';
		this.rtn.err_desc = '';
		return rtn_tmp;
	};
	this.db_url = () => {
		return server_config.server.db_url
	};
	this.db_config = () => {
		return { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false };
	}
	this.db_auto_increment = model => {
		return {
			model: model,
			field: '_id',
			startAt: 1,
			increment : 1
		};
	}
}
module.exports = lib;