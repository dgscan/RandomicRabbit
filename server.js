/* Assignment: Randomic Rabbit is a web service that generates
random numbers at random time intervals, and sends them
to the connected user in real-time.
No memory about generated numbers is maintained.
You are asked to: choose a suitable app architecture;
implement the backend server using a framework
of your choice (preferably python); develop a
dynamic web user interface that tracks and shows
the server-generated numbers as long as the user is
connected. Please, provide all the code, along with a
readme file containing the instructions to run the code,
preferentially on a GIT repository of your
choice _______________________________________________ */


var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer (function (request, response,err) {

    var q = url.parse(request.url, true);
    var path = q.pathname;

    console.log("path: "+path);



    if(path==='.' || path==='/' || path==='./index'){

        path='./index.html';

        fs.readFile(path, function (err, data) {

            if (err) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                return response.end();
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                return response.end();
            }

        });
    }else if(path=='/getRandomNumbers'){

        var randomNumber=Math.floor((Math.random() * 1000) + 1);
        console.log(randomNumber);

        var json = JSON.stringify(randomNumber);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(json);
        return response.end();

    }



});

server.listen(5000, function () {
    console.log((new Date())+'Server listens on port 5000');
});
