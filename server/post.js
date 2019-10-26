const post_middleware = (req, res, next) => {
	req.post = () => {
		if(req.body){
			const keys = Object.keys(req.body);
			let rtn = {};
			for( let i=0; i<keys.length; i++ ){
				if( typeof req.body.keys[i] === 'string' ){
					//string
				}
			}
		}
	}
}
module.exports = post_middleware;