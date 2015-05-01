var Hapi    = require('hapi');
var port    = process.env.PORT || 8080; // heroku define port or use 1337 1000
var server  = new Hapi.Server();
var ip      = require('./lib/lanip');

server.connection({ host : ip, port: port, routes: { cors: true } });

server.route({
    method: '*',
    path: '/{path*}',
    handler: {
    proxy: {
      mapUri:  function (request, callback) {
        console.log(' - - - - - - - - - - - - - - - - - - - - - - request.url')
        console.log(request.url)
        console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')

        // console.log(callback.toString());
        // borrowed this one-liner from: http://stackoverflow.com/questions/2992276/replace-first-character-of-string
        var url = request.url.href.indexOf('/') == 0 ? request.url.href.substring(1) : request.url.href;
        console.log(">> "+url)
        console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
        // query = request.url.search ? request.url.search : '';
        // p = request.params.p ? '.' + request.params.p +'.' : '' ;
        //
        // //loaded from a configuration file
        // tls = Config..tls;
        // host = Config..host;
        // port = Config.port;
        //
        // url = (tls ? 'https://' : 'http://') + host + port + p  + request.path + query;
        //
        // console.log('Method: ' + request.method.toUpperCase() + ' Url: ' + url);

        callback(null,url);
        }
      }
    }
});

server.start();
console.log('Now Visit: http://' + ip + ':' +port);
