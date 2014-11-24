//configuration of the app
exports.appConfig=
{
	appName: "Foodpacker.ca",
	appDescription: "Foodpacker//CA",
	version : "0.1.0",
	menus : [
		["Home","/"],
		["Products","/products/categories/","/products/(.*)"],//0: menu name, 1: menu link, 2: menu href mapping(by default equals to 1)
		["Shopping Cart","/cart/","/cart/(.*)"],
		["About","/about"]
	],
	login: "/login",
	appPath: "index.html"
}

//configuration of the router
exports.routers={
	"/" : "index",
	"/products/categories/(.*)" : "categories",
	"/products/product/(.*)"	: "product",
	"/cart/(.*)" : "cart",
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