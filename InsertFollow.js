r = require('rethinkdb');
var connection = null;
r.connect({
    host: 'localhost',
    port: 28015
}, function (err, conn) {

    if (err) throw err;
    connection = conn;
    // r.db("test").tableCreate("fellowship").run(conn, function(err, result) {
    //     if (err) throw err;
    //     console.log(result)
    // })
    r.table("fellowship").insert([{
            name: "Frodo",
            species: "hobbit"
        },
        {
            name: "Sam",
            species: "hobbit"
        },
        {
            name: "Merry",
            species: "hobbit"
        },
        {
            name: "Pippin",
            species: "hobbit"
        },
        {
            name: "Gandalf",
            species: "istar"
        },
        {
            name: "Legolas",
            species: "elf"
        },
        {
            name: "Gimili",
            species: "dwarf"
        },
        {
            name: "Aragorn",
            species: "human"
        },
        {
            name: "Boromir",
            species: "human"
        }
    ]).run(conn, function(err, result) {
        if (err) throw err;
        console.log(result)
    })

    r.table("fellowship").filter({
        species: "hobbit"
    }).update({
        species: "halfling"
    }).run(conn, function(err, result) {
        if (err) throw err;
        console.log(result)
    })


})