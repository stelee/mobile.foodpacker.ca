(function(){
	//config
	var config=require("./config");
	var router=require("./libs/router").getInstance(config.routers);
	var loadBusiness=function(businessName,businessFile)
	{
		injector.register(businessName,require('./business/'+businessFile)[businessName]);
	}
	var loadService=function(serviceName,serviceFile)
	{
		injector.register(serviceName,require('./services/'+serviceFile).getInstance());
	}

	//registration of the dependencies
	//appconfig
	injector.register("appConfig",config.appConfig);
	injector.register("language",require("./libs/_l").Lang);


	//traits
	//injector.register("TraitsObjectStatusSupport",require("./libs/traits_object_status_support").traits);

	//core service
	injector.register("routerService",router);
	injector.register("locationService",require("./libs/location_service").getInstance()); //hashbang link



	//core components
	injector.register("menuController",require("./libs/menu_controller").getInstance($("[data-role=menu]")));
	injector.register("titleController",require("./libs/title_controller").getInstance($("[data-role=title]")));
	injector.register("ToolbarController",require("./libs/toolbar_controller").ToolbarController);
	injector.register("dispatcher",require("./libs/dispatcher").getInstance());
	injector.register("BaseController",require("./libs/base_controller").BaseController);
	injector.register("SBaseController",require("./libs/secure_base_controller").SBaseController);  //security base controller
	injector.register("templateManager",require("./libs/template_manager").getInstance({
																						path: './template',
																						postfix: 'html'
																					}));
	injector.register("hoganTemplates",require("./views/template").templates);
	injector.register("widgetManager",require("./libs/widget_manager").getInstance());
	injector.register("eventManager",require("./libs/event_manager").getInstance());
	injector.register("session",context.session);
	injector.register("storage",context.storage);


	//handy utils	
	injector.register("HttpClient",require('./libs/http_client').HttpClient);
	injector.register("loadBar",require("./libs/progress_bar").getInstance());
	injector.register("formValidator",require("./libs/form_validator").getInstance());
	injector.register("notifier",require("./libs/notifier").getInstance());
	injector.register("FormGenerator",require("./libs/form_generator"));
	injector.register("baseWidget",require("./libs/base_widget").getInstance());
	injector.register("BaseWidget",require("./libs/base_widget").BaseWidget);
	injector.register("BaseService",require("./services/base_service").BaseService);
	injector.register("path",require("./libs/path"));
	injector.register("dateUtils",require("./libs/date_utils"));
	injector.register("stringUtils",require("./libs/string_utils").stringUtils);
	injector.register("htmlEnDecode",require("./libs/htmlEnDecode"));
	injector.register("GoogleGeo",require("./libs/google_geo").GoogleGeo);

	//shopping cart
	injector.register("Cart",require("./entities/cart"));
	injector.register("AddressBook",require("./entities/address_book"));
	injector.register("Creditcard",require("./entities/creditcard"));


	//business
	loadBusiness('FeaturesBusiness','features_business');
	loadBusiness('CategoriesBusiness','categories_business');
	loadBusiness('ProductsBusiness','products_business');


	//Services
	loadService("productService","product_service");
	loadService("checkoutService","checkout_service");
	loadService("shipmentService","shipment_service");
	
})()
