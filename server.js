var 	app = require("http").createServer(handler),
	io = require("socket.io")(app),
	fs = require("fs")

app.listen(8000);

function handler(req, res) {
	fs.readFile(__dirname+"/index.html", function(err, data) {
		if (err) {
			console.log(err);
			res.writeHead(500);
			return res.end("Error loading index.html");
		}
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.end(data);
	});
}

io.on("connection", function(socket) {
	setInterval(function(){
		socket.emit("news", { hello: "world" });
	}, 5000);
	socket.on("my other event", function (data) {
		console.log(data);
	});
});
