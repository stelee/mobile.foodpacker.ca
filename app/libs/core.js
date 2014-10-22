function initialize(scope){
	injector.process("menuController","titleController","@toolbarController","language",
		function(menuContrller,titleController,toolbarController,language){
			//register the function for multiple-language support
			scope._l=language;

			//hide the menu
			$(window).click(function(){
				if($(".navbar-collapse").hasClass("in")){
					$(".navbar-collapse").removeClass("in");
				}
			})

			titleController.render();
			menuContrller.render();
			toolbarController.render("#shortcut");
		})
}
(function(global){
	//register the global core event
	var dispatch=function(){
		injector.process("routerService","dispatcher","menuController",
			function(routerService,dispatcher,menuController){
				var controllerDef=routerService.routeByCurrentLocation();		
				dispatcher.dispatch(controllerDef);
				menuController.setCurrentSelected();
		})
	}
	$(window).on("hashchange",dispatch);
	initialize(global);
	dispatch();
})(this)