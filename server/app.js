var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app);
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server : server});
var colors = [ 'darkcyan', 'green', 'blue', '	silver', 'purple', 'plum', 'orange' ];
colors.sort(function(a,b) { return Math.random() > 0.5; } );
var clients = [];

wss.on('connection', function(ws) {
clients.push(Object.assign(ws, {userId:Date.now()}));
var userName = false;
var userColor = false;
  ws.on('message', function(msg){
    if(!userName) {
      const pmsg = JSON.parse(msg);
        userName = pmsg.userName 
        userColor = colors.shift();
        clients.forEach((item,index) => {
          if (item.userId == ws.userId)
          {
            Object.assign(clients[index],{userName: userName, avatar: pmsg.avatar})
          }
         });
        let userArray = clients.map((user)=>{
          return {userName:user.userName, userId:user.userId,userAvatar:user.avatar}
        });
        const newArray=userArray.filter((user)=>{return user.userName});
        ws.send(JSON.stringify({ type:'connected_users', usersArray:[newArray[newArray.length-1],...newArray.slice(0,newArray.length-1)]})); 
         for (var i=0; i < clients.length-1; i++) {
           if(clients[i].userId!==ws.userId){
          clients[i].send(JSON.stringify({ type:'connected_new_user', userName:ws.userName, userId:ws.userId, userAvatar:ws.avatar }));
           } 
        } 
    }else{
        var obj = {
          time: (new Date()).getTime(),
          text: msg,
          author: userName,
          color: userColor,
          userId:ws.userId
        };
        var json = JSON.stringify({type:'message', data: obj});
         for (var i=0; i < clients.length; i++) {
             clients[i].send(json);
         }
    }
  });
  ws.on('close', function(){
  var index = clients.indexOf(ws);
  clients.splice(index, 1);
  if(userName !== false && userColor != false){
    colors.push(userColor);
  }  
  var json = JSON.stringify({type:'disconnected_user', userId: ws.userId });
  for (var i=0; i < clients.length; i++) {
      clients[i].send(json);
  }
  
  });
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
