//configuration of the app
exports.appConfig=
{
	appName: "Exceptional Report",
	appDescription: "Exceptional Report",
	version : "0.1.0",
	menus : [
		["DashBoard","/"],
		["Pre-Algo Reports","/pre-algo-reports/contract/","/pre-algo-reports/(.*)"],//0: menu name, 1: menu link, 2: menu href mapping(by default equals to 1)
		["Post-Algo Reports","/post-algo-reports/liquidityBucket/","/post-algo-reports/(.*)"],
		["About","/about"]
	],
	login: "/login",
	appPath: "/public/"
}

//configuration of the router
exports.routers={
	"/" : "index",
	"/pre-algo-reports/(.*)" : "preAlgoReports",
	"/post-algo-reports/(.*)" : "postAlgoReports",
	"/about" : "about",
	"/login" : "login"
}
//configuration of the Report
exports.reportTypes={
	'pre-algo': [
		"contract",
		"position"
	],
	'post-algo': [
		"liquidityBucket",
		{name: "Lender Capacity",type: "lenderCpty"},
		{name: "Customer LEID", type : "customerLEID"},
		"box",
		"businessArea",
		{name: "PB Commitment Term",type: "PBCommitmentTerm"}
	]
}