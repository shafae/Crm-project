const urlModel = require("../../db/models/urls.model")
const myHelper = require("../../app/helper")

const checkRole = (async (req, res, next) => {
	try{
	let validUrl;
	let reqUrl = req.originalUrl;
	const reqParams = Object.keys(req.params);
	const reqQuery = Object.keys(req.query);
	dbUrl = await urlModel.find({link:reqUrl})
		
	validUrl=dbUrl.find((item) => {
		if (reqParams.length > 0) {
			reqParams.forEach((paramKey) => {
		
				if (item.params.find(param=>{return param==paramKey})) {
					reqUrl = reqUrl.replace(`${req.params[paramKey]}`, "");
				}
				reqUrl = reqUrl.replace("//", "/");
			});
		}
		if (reqQuery.length > 0) {
			reqQuery.forEach((queryKey) => {
				if (item.queries.find(query=>{return query==queryKey})) {
					reqUrl = reqUrl.replace(`${queryKey}=${req.query[queryKey]}`,"",);
				}
			});
			reqUrl = reqUrl.replace("?", "");
		}
		if(req.user.roleName){
			item.roles.forEach((role)=>{
				if(role!=req.user.roleName) throw new Error("unauthorized role")
			})
		}


		return item.link == reqUrl;
	});
	if (!validUrl) throw new Error("unauthorized url");
	
	next();
}
catch(e){
	myHelper.resHandler(res, 500, false, e.message, "unauthorized")
}
});

module.exports = {checkRole}