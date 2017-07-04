var sockio = require("socket.io");
var app = require("express")();
var r = require("rethinkdb");
var connection=null
var io = sockio.listen(app.listen(4000), {
  log: true
});
io.on("connection", function (socket) {
  r.connect({
    host: 'localhost',
    port: 28015
}, function (err, conn) {

    if (err) throw err;
    connection = conn;}).then(function (conn) {
      return r.table("fellowship").changes().run(connection);
    })
    .then(function (cursor) {
      cursor.each(function (err, data) {
        io.sockets.emit("data", data);
        console.log(data)
      });
    });
});