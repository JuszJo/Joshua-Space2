var exp = require("express");
var app = exp(); 
var port = 3000;

const dotenv = require('dotenv');
dotenv.config();

app.use(exp.urlencoded({
    extended : true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
    app.use('/', exp.static(__dirname));
});

app.post('/', (req, res) => {
    var details = req.body;
    var MC= require('mongodb').MongoClient;
    var url = process.env.MONGODB_URI;
    MC.connect(url, (err, dbase) => {
        if (err) throw err;
        console.log(`Connected to Mongodb Atlas`);
        var data = dbase.db(`mydb`);
        data.collection(`details`).insertOne(details, (err, res) => {
            if(err) throw "Could not insert";
            console.log(`inserted Data into Collection`);
            dbase.close();
        });
    });
    res.send("Thank you for your details");
});

app.listen(process.env.PORT);
