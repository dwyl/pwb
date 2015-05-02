var port    = process.env.PORT || 8080; // heroku define port or use 1337 1000
var ip      = require('./lib/lanip');
var http = require('http');
var https = require('https');

// how do we pass a url from the client to the proxy server?
function parseurl(url){

}

// is it secure or insecure?

// what is the host

// remove request.headers.host 


http.createServer(function(request, response) {
  // var proxy = http.createClient(80, request.headers['host'])
  console.log(' - - - - - - - - - - - - - - - - - - - METHOD');
  console.log(request.method);
  console.log(' - - - - - - - - - - - - - - - - - - - URL');
  console.log(request.url);
  console.log(' - - - - - - - - - - - - - - - - - - - HEADERS');
  console.log(request.headers);
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - ');
var options = {
      host: process.env.ES_HOST,
      port: process.env.ES_PORT,
      path: '/' + record.index + '/' + record.type + '/' + record.id,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

  var proxy_request = http.request(request.method, request.url, request.headers);
  proxy_request.addListener('response', function (proxy_response) {
    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });
  request.addListener('data', function(chunk) {
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
}).listen(port);

console.log('Now Visit: http://' + ip + ':' +port);
