var express = require('express')
var cors = require('cors')
var app = express()
r = require('rethinkdb');
var connection = null;
app.use(cors())

app.get('/', function (req, res, next) { //products/:id
    r.connect({
        host: 'localhost',
        port: 28015
    }, function (err, conn) {
        if (err) throw err;
        connection = conn;
        r.table('authors').changes().run(connection, function (err, cursor) {
            if (err) throw err;

            cursor.eachAsync(function (err, row) {
                if (err) throw err;

                console.log(JSON.stringify(row, null, 2));
                //  res.json(row)
            }).then(function () {
                console.log('done processing');
            }).catch(function (error) {
                console.log('Error:', error.message);
            });;


        });
    })

})

app.get('/insert/:name', function (req, res, next) { //products/:id
    console.log(req.params.name)
    r.connect({
        host: 'localhost',
        port: 28015
    }, function (err, conn) {

        if (err) throw err;
        connection = conn;
        r.table('authors').insert([{
            name: req.params.name,
            tv_show: "aaaa",
            posts: [{
                    title: "aaa",
                    content: "ccc"
                },
                {
                    title: "bbb",
                    content: "ddd"
                },
                {
                    title: "The new Earth",
                    content: "The discoveries of the past few days..."
                }
            ]
        }]).run(connection, function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
            res.json(result)
        })

    })
})

app.listen(8888, function () {
    console.log('CORS-enabled web server listening on port 80')
})