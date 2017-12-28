var express = require('express');
app = express();

var urls =[];

app.use(express.static('public'));
app.get('/new/:url', function(req,res){
  var longUrl = req.params.url;
  var pattern = /www\.([A-Za-z])+\.([A-Za-z]{2,})+/;
  var checkUrlFormat = pattern.test(longUrl);
  if(!checkUrlFormat){
    res.send('Not a valid webaddress format.');//{error:'Invalid web address!'});
  } else {
    var checkUrlExists = urls.indexOf(longUrl);
    var response;
    if(checkUrlExists==-1){
      urls.push(longUrl);
      response = '<p>Original url: '+longUrl+'</p><p>Short url: <a href="http://'+longUrl+'">'+String(urls.length-1)+'</a></p>'
      } else {
        response = '<p>Original url: '+longUrl+'</p><p>Short url: <a href="http://'+longUrl+'">'+checkUrlExists+'</a></p>'
      }
  res.send(response);
}
})

app.get('/:shortUrl', function(req,res){
  var redirectUrl = 'http://'+urls[req.params.shortUrl];
  res.redirect(301, redirectUrl);
})


app.listen(3000, function(){
  console.log('server running...')
})
