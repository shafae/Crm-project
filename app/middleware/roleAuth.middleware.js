const urlModel = require("../../db/models/urls.model")
const myHelper = require("../../app/helper");
const { query } = require("express");

const checkRole = (async (req, res, next) => {
	try{
	let validUrl;
	let reqUrl = req.originalUrl;
	const reqParams = Object.keys(req.params);
	const reqQuery = Object.keys(req.query);
	dbUrl = await urlModel.find({"params":reqParams, "queries":reqQuery, "roles":req.user.roleName})
	validUrl=dbUrl.find((item) => {
		if (reqParams.length > 0) {
			reqParams.forEach((paramKey) => {
				const param=item.params.find(param=>{
					if(param.includes(paramKey)){
						return param
						
					}})
					if(param) {
					reqUrl = reqUrl.replace(`${req.params[paramKey]}`, "");
				}
				reqUrl = reqUrl.replace("//", "/");

			});
		}
		if (reqQuery.length > 0) {
			reqQuery.forEach((queryKey) => {
				const query =item.queries.find(query=>{
					if(query.includes(queryKey)){
						return query
					}})
				if (query) {
					reqUrl = reqUrl.replace(`${queryKey}=${req.query[queryKey]}`,"",);
				}
			});
			reqUrl = reqUrl.replace("?", "");
		}
		if(item.roles){
			const role =item.roles.find((role)=>{
				if((role.includes(req.user.roleName))) {
					return role
				}
			})
			if(!role)throw new Error("unauthorized role")
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