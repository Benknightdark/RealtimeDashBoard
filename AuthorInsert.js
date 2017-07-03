r = require('rethinkdb');
var connection = null;
r.connect({
    host: 'localhost',
    port: 28015
}, function (err, conn) {

    if (err) throw err;
    connection = conn;
    r.table('authors').insert([{
        name: "William Adama",
        tv_show: "test",
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
    })


r.table('authors').update({type: "fictional"}).
    run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });

r.table('authors').
    filter(r.row("name").eq("test")).
    update({rank: "Admiral"}).
    run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });


r.table('authors').filter(r.row("name").eq("test")).
    update({posts: r.row("posts").append({
        title: "Shakespeare",
        content: "What a piece of work is man..."})
    }).run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
r.table('authors').
    filter(r.row('posts').count().lt(3)).
    delete().
    run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
})