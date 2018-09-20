var express = require("express"),
    app = express(),
    path = require('path'),
    bodyParser = require("body-parser"),
    session = require('express-session'),
    f = require('./data.js');
    port = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({secret: 'crazy cat'}));

var sess;

app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname + '/html/index.html'));
});
app.post("/pin", function(request, response) {
    sess = request.session;
    
    f.getToken(request.body.pin, function(err, data){
        if(err){
            response.send(err);
        }else{
            sess.accessToken = data;
            response.redirect('/schedule');     
        }
    });


    
    
});
app.get("/schedule", function(request, response) {
    sess = request.session;

    response.send(sess.accessToken);
    //response.sendFile(path.join(__dirname + '/html/schedule.html'));
});
app.listen(port);
