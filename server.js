var path = require("path"),
    http = require("http"),
    util = require("util"),
    paperboy = require("paperboy"),
    serveFromArtifacts = null,
    serveFromExamples = null,
    serveFromTests = null;

// optimist
var optimist = require("optimist")
    .usage("Run the inject example and test server.\nUsage: $0 server")
    .boolean("help")
    .describe("help", "show this message");

// create a static server handler
function createServer(path) {
  return function(req, res) {
    paperboy
    .deliver(path, req, res)
    .addHeader('Expires', 0)
    .error(function(statCode, msg) {
      res.writeHead(statCode, {'Content-Type': 'text/plain'});
      res.end("Error " + statCode);
    })
    .otherwise(function(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
    });
  };
}

serveFrom = createServer(path.normalize("" + __dirname + "/"));

// live server function, used on multiple ports
function server(request, response) {
  var serve = null,
      options = {};
  
  // select a server to handle this file
  if (request.url.indexOf("/") === 0) {
    serve = serveFrom;
  }
  
  if (request.url === '/favicon.ico') {
    // return empty response for favico... keeps the logs clear
    return response.end();
  }
  
  // standard serving call
  return serve(request, response);
}

exports.task = function() {
  if (optimist.argv.help) {
    optimist.showHelp();
    return;
  }
  
  http.createServer(server).listen(4100);
  http.createServer(server).listen(4101);
  util.log("Server running on ports 4100 and 4101");
  util.log("-----")
  util.log("access:     http://localhost:4100/index.html");
};