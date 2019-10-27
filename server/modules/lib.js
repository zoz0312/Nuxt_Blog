function lib(){
	this.rtn = {
		success:false,
		data : null,
		succ_desc : '',
		err_desc : ''
	};
	this.rtn_result = () => {
		const rtn_tmp = JSON.stringify(this.rtn);
		this.rtn.success = false;
		this.rtn.data = null;
		this.rtn.succ_desc = '';
		this.rtn.err_desc = '';
		return JSON.parse(rtn_tmp);
	};
}
module.exports = lib;