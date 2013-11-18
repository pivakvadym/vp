var server = require('http').createServer(handler)
    , io = require('socket.io').listen(server)
    , fs = require('fs');
io.set('log level', 2);
server.listen(8080) ;
var files = [];

function handler(req, res){
    console.log('-------------------------------->' + req.url);
    var file;
    if(req.url == "/"){
        file = fs.readFileSync(__dirname + "/index.html");
        res.setHeader("Content-Type", "text/html");
         }
        else if(req.url.slice(0, 4) == "/js/"){
        file = fs.readFileSync(__dirname + req.url);
        res.setHeader("Content-Type", "text/javascript");
        }
    if(req.url == "/style.css"){
        file = fs.readFileSync(__dirname + "/style.css");
        res.setHeader("Content-Type", "text/css");
    }

    if(req.url.slice(0, 6) == "/imgs/"){
        file = fs.readFileSync(__dirname + req.url);
        res.setHeader("Content-Type","file/png");
    }

    if(req.url == "/DocMiniJeuJS_TP4.pdf"){
        file = fs.readFileSync(__dirname + "/DocMiniJeuJS_TP4.pdf");
        res.setHeader("Content-Type","file/pdf");
    }

    if(!file){
        file = "file not found";
        res.statusCode = 404;
    }
    res.write(file);
    console.log("---------------server---------------------->");
    res.end();
}

var maxNumPlayers = 2; // max quantity of players
var players = [];
var playersData = {};
    var wins = {};
var winPlayers;

var playersInOneLevel = 0;

var gameStarted = false;

// usernames which are currently connected to the chat  
var usernames = {};

// rooms which are currently available in chat  
var rooms = ['room1','room2','room3'];

io.sockets.on('connection', function (socket) {

    //  ------------------------------------- Game functions ----------------------------
    players.push(socket);

    socket.on('requestplayersdata', function (){
        var response = {
            players: [],
            date: playersData.date
        };
        players.forEach(function(player){
            response.players.push(playersData[player.id]);
        });
        socket.emit("updateplayersdata", response);
    });

    socket.on('updatemydata', function (data) {
        playersData[socket.id] = data;
        playersData.date = new Date();
    });

    socket.on('levelpassed', function () {
        playersInOneLevel--;
        console.log('---->' + playersInOneLevel
            + ' playersData: ' + playersData[socket.id].nickname
            + ' win: ' + wins[socket.id]);

        // console.log(players);
        // console.log(playersData);


    // console.log('---->' + playersData[0].nickname + ' ' +  playersData[1].nickname + ' ' + wins[0] + ' ' + wins[1]);
        if(playersInOneLevel === 0){
            var n = new Array();
            var w = new Array();
            var i = 0;
            for (cnt = 0; cnt < players.length; cnt++) {
                console.log('nick ' + playersData[players[cnt].id].nickname);
                n[i] = playersData[players[cnt].id].nickname;
                w[i] = wins[players[cnt].id];
                i++;
            }
            // socket.emit('printWin', winPlayers);
            nextLevel(
                'win ' + winPlayers,
                 n[0], n[1], w[0], w[1]
            );
        }else{
            wins[socket.id] = wins[socket.id] + 1;
            winPlayers = playersData[socket.id].nickname;
            socket.emit('waitOfLoser', wins[socket.id]);
        }
    });

    socket.on('nextLevel', function () {
        console.log('next level +')
        nextLevel();
    });

    socket.on('disconnect', function () {
        console.log("----> disconnect for " + playersData[socket.id].nickname);

        delete usernames[playersData[socket.id].nickname];

        var i =0;
        var c =0;
        var newPlayer = new Array();
        for (var cnt = 0; cnt < players.length; cnt++) {
            if (socket.id === players[cnt].id) {
                i = cnt;
                newPlayer[c++] = players[cnt];
            }
            wins[players[cnt].id] = 0;
        }

        console.log("----> players for " + players.length);
        players = newPlayer;
        console.log("----> players for " + players.length);

        players.forEach(function(player){
            player.emit("companiondisconnected");
            // remove the username from global usernames list

            // update list of users in chat, client-side
            player.emit('updateusers', usernames);
            // echo globally that this client has left
            // player.broadcast.emit('updatechat', 'SERVER', playersData[socket.id].nickname + ' has disconnected');
        });

    });

    socket.on('nextlevelData', function (text, player1, player2, win1, win2) {

        //  gameStarted = false;
        //  stopGame();

        if(levelIndex >= levels.length){
            // socket.emit("disconnect");
            stopGame();
            drawRect(0, 0, canvas.width, canvas.height, "#FFF");
            drawText('GAME OVER !!', "20px sans-serif", canvas.width/2, canvas.height/2, "red");
            drawText(player1 + ' => win: ' + win1 + 'times ', "14pt sans-serif",100, canvas.height/20, "#ee82ee");
            drawText(player2 + ' => win: ' + win2 + 'times ', "14pt sans-serif",300, canvas.height/20, "#00FF7F");
        }else{
            levelIndex++;
            if(!gameStarted){
                waitReady(text);
                gameStarted = true;
            }
        }
    });



    socket.emit('waitotherplayers');

    //  ------------------------------------- Chat function ----------------------------
    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
        // store the username in the socket session for this client  
        // socket.username = username;
        // store the room name in the socket session for this client  
        socket.room = 'room1';
        // add the client's username to the global list  
        usernames[username] = username;
        // send client to room 1  
        socket.join('room1');
        // echo to client they've connected  
        // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
        // echo to room 1 that a person has connected to their room  
        // socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
        socket.emit('updaterooms', rooms, 'room1');

    //    socket.emit('updateusers', usernames);

        // Game path
        playersData[socket.id] = {
            nickname: username
        };

        wins[socket.id] = 0;
        updatePlayers();

        players.forEach(function(player){
            player.emit('updateusers', usernames);
         });
    });

    // when the client emits 'sendchat', this listens and executes  
    socket.on('sendchat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters  
        io.sockets.in(socket.room).emit('updatechat', playersData[socket.id].nickname, data);
    });
});

function chatDisconnect(nickname) {
    // remove the username from global usernames list  
    delete usernames[nickname];
    // update list of users in chat, client-side  
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left  
    socket.broadcast.emit('updatechat', 'SERVER', nickname + ' has disconnected');
    socket.leave(socket.room);
}




function updatePlayers(){
    console.log("-------->gameStarted " + gameStarted + " NumPlayers is " + players.length);
    if(!gameStarted && players.length === maxNumPlayers){
        startGame();
    }
    playersInOneLevel = players.length;
}

function startGame(){
    gameStarted = true;
    players.forEach(function(player){
        player.emit("ready");
    });
}

function resetGame(){
    gameStarted = false;
    players.forEach(function(player){
        player.emit("companiondisconnected");
    });
    players = [];
    playersData = {};
    playersInOneLevel = 0;
}


function nextLevel(){
    playersInOneLevel = players.length;
    players.forEach(function(player){
        player.emit("nextlevel");
    });
}

function nextLevel(text,  player1, player2, win1, win2){
    console.log('next level ' + text)
    playersInOneLevel = players.length;
    players.forEach(function(player){
        player.emit("nextlevelData", text,  player1, player2, win1, win2);
    });
}