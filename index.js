var app = require("express")(),
	url = require("url"),
	filehandler = require("./filehandler/index.js");
try{	
	function start_server(port) {
		app.listen(port);
		console.log(Date() + ": Server started listening to " + port);
	}
	
	app.get("/", function(request, response){
		filehandler.loadFile("index", request, response);
	});
	
	app.get(["*.css", "*/images/*", "*/css/*", "*/js/*"], function(request,response) {
		filehandler.loadSupportFiles(request, response);
	});
	
	start_server(3000);
} catch (err) {
	console.log(Date() + ": ERROR:" + err);
	start_server(port);
}