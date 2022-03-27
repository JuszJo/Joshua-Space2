var express = require('express');
var sendmail = require('./mail');
//const connect = require('./mongo');

var app = express();
var port = 3000;

app.use(express.urlencoded({
    extended : true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    app.use(express.static(__dirname));
});

app.post('/', (req, res) => {
    //connect(req.body);
    sendmail(req.body)
    res.send('Thank You For Your Details');
})

app.listen(process.env.PORT);

/*app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});*/