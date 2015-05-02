var port    = process.env.PORT || 8080; // heroku define port or use 1337 1000
var ip      = require('./lib/lanip');
var http = require('http');
var https = require('https');

// how do we pass a url from the client to the proxy server?
function parseurl(request) {
  var url = request.url;
  var o = { // the options we are going to pass in to our http.request
    method  : request.method, // pass on request method
    headers : request.headers // pass headers through
  };
// remove the leading forward slash from url. borrowed this one-liner from:
// http://stackoverflow.com/questions/2992276/replace-first-character-of-string
  var url = url.indexOf('/') == 0 ? url.substring(1) : url;
  // is target secure or insecure?
  if(url.indexOf('https') > -1) {
    o.port = 443;
  }
  // remove protocol from the path
  if(url.indexOf('://') > -1) {
    url = url.split('://')[1];
  }
  // now separate the host from the path
  if(url.indexOf('/') > -1) {
    var u = url.split('/')
    o.host = u[0];       // everything before the first forward slash
    o.path = '/' + u[1]; // everyting after the first foward slash
  }
  else {
    o.host = url;
    o.path = '/';
  }
  // over-write request.headers.host with correct host
  o.headers.host = o.host;
  return o;
}

function proxyHandler(request,response) {
    var proxy;
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - OPTIONS');
    var options = parseurl(request);
    console.log(options)
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - ');
    if(options.port === 443) {
      proxy = https;
    }
    else {
      proxy = http;
    }
    // console.log(proxy.request.toString());s
    var preq = proxy.request(options, function(pres) {
      // console.log(this);
      pres.setEncoding('utf8');
      console.log(pres.statusCode);
      console.log(pres.headers);
      response.writeHead(pres.statusCode, pres.headers);
      pres.on('data', function (chunk) {
        console.log(chunk);
        response.write(chunk)
      }).on('end', function () {
        response.end();
      });
    });

    preq.on('error', function(e) {
      console.log('>> Problem with http request: ' + e.message);
      // callback(e);
      response.write(e.message);
      response.end();
    });

    preq.end();
}

http.createServer(function(request, response) {
  if(request.url.length > 1) {
    proxyHandler(request,response)
  }
}).listen(port);

console.log('Now Visit: http://' + ip + ':' +port);
