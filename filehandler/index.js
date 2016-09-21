var jade = require("jade"),
	fs = require("fs"),
	url = require("url");

function loadFile(identifier, request, response) {
	try{
		console.log(Date() + ": Request for " + identifier + " from " + request.connection.remoteAddress);
		fs.readFile("data.json", "utf-8", function(error, data) {
			try{
				var json_obj = JSON.parse(data);
				var renderFunc = jade.compileFile(json_obj[identifier].filename);
				var data = { "applicationname": json_obj.applicationname, "owner": json_obj.owner, "pagetitle": json_obj[identifier].pagetitle, "formnames": json_obj[identifier].formnames}
				var html = renderFunc(data);
				response.writeHead("200", {"content-type": "text/html"})
				response.write(html);
				response.end();
			} catch (error) {
				console.log(Date() + ": ERROR:" + error);
				response.end("ERROR: " + error);
			}
		});
	} catch (error) {
		console.log(Date() + ": ERROR:" + error);
		response.end("ERROR: " + error);
	}
}

function loadSupportFiles(request, response) {
	try{		
		var pathname = url.parse(request.url).pathname;
		pathname = "." + pathname;
		console.log(Date() + ": Request for resource at " + pathname);
		var readStr = fs.createReadStream(pathname);
		response.writeHead("200");
		readStr.pipe(response);
	} catch (error) {
		console.log(Date() + ": ERROR:" + error);
		response.end("ERROR: " + error);
	}
}

exports.loadFile = loadFile;
exports.loadSupportFiles = loadSupportFiles;