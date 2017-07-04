var app = require("express")();
var r = require("rethinkdb");

app.listen(8090);
console.log("App listening on port 8090");

app.get("/fellowship/species/:species", function (req, res) {
    r.connect().then(function (conn) {
            return r.db("test").table("fellowship")
                .filter({
                    species: req.params.species
                }).run(conn)
                .finally(function () {
                    conn.close();
                });
        })
        .then(function (cursor) {
            return cursor.toArray();
        })
        .then(function (output) {
            res.json(output);
        })
        .error(function (err) {
            res.status(500).json({
                err: err
            });
        })
});