var request = require('request');
var config = require('./config.json');
var f = module.exports = {};


f.getToken= function(pin, nestResult)
{
    var options = { method: 'POST',
    url: config.accessTokenUrl,
    headers: 
    {      
        'Content-Type': 'application/x-www-form-urlencoded',
        'code': pin,
        'grant_type': 'authorization_code',
        'client_secret': config.clientSecret,
        'client_id': config.clientId
    },
    form: 
    { 
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: 'authorization_code',
        code: pin,
        'Content-Type': 'application/x-www-form-urlencoded' } };

    request(options, function (error, response, body) {
    if (error){ return  nestResult(error, null)}
    
    else {return nestResult(null,body)};
    
    });

}





