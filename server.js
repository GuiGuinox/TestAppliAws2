var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route([
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, hapi!');
    }
  },
  {
    method: 'GET',
    path: '/test1',
    handler: function (request, reply) {
        reply('test 1');
    }
  },
  {
    method: 'GET',
    path: '/test2',
    handler: function (request, reply) {
        reply('test 2');
    }
  },
  {
    method: 'GET',
    path: '/calculate/{value}',
    handler: function(request, reply) {

      var i = 2;
      var k = 2;
      var premiers = [];// contient les nb premiers
      var max = request.params.value;
      var ok = true;
      while(i < max) {// tester chaque nb
          ok = true;// remettre ok à true
          k = 2;// remettre k à 2
          while(k < i && ok) {// tester si i est divisible par k
              if(i % k == 0)// si i divisé par k est entier
                  ok = false;// i n'est pas premier
              k ++;// incrémenter k
          }
          if(ok)// si i est premier...
              premiers.push(i);// on rajoute i dans le tableau
          i ++;
      }
      reply(premiers);

      //
      // setTimeout(()=> {
      //   reply('Ok: ' + request.params.value);
      // }, request.params.value * 1000);
    }
  }
]);

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
