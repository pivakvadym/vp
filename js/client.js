var myNick;
var playersData = {
    players: [], // {nickname, x, y, width, height, color}
    date: new Date(0)
};

var socket;
var gameStarted = false;


resetConnection();

function startGameSession(){
    socket.on('connect', function(){

       if(!myNick){
            myNick = prompt("What's your nick?");
        }
        socket.emit('adduser', myNick);  
    });

    socket.on('updateplayersdata', function (data) {  
        playersData = data;
    });

    socket.on('waitotherplayers', function (data) {  
        waitOtherPlayers();
    });

    socket.on('ready', function () {
        console.log("----client.js------number of player is good to begin =)")
        if(!gameStarted){
            waitReady();
            gameStarted = true;
        }
    });

    socket.on('nextlevel', function () {
        if(!gameStarted){
            waitReady();
            gameStarted = true;
        }
    });

    var levelIndex = 0;

    socket.on('nextlevelData', function (text, player1, player2, win1, win2) {

       /* gameStarted = false;
        stopGame();*/

        if(levelIndex >= levels.length-1){
            // socket.emit("disconnect");
             stopGame();
             drawRect(0, 0, canvas.width, canvas.height, "#FFF");
             drawText('GAME OVER !!', "20px sans-serif", canvas.width/2, canvas.height/2, "red");
             drawText(player1 + ' => win: ' + win1 + 'times ', "14pt sans-serif",100, canvas.height/20, "#ee82ee");
             drawText(player2 + ' => win: ' + win2 + 'times ', "14pt sans-serif",300, canvas.height/20, "#00FF7F");
         }else{
            levelIndex++;
            console.log("--> nextlevel levelIndex " + levelIndex);
            if(!gameStarted){
                waitReady(text);
                gameStarted = true;
            }
        }
    });


    socket.on('companiondisconnected', function(){
        drawRect(0, 0, canvas.width, canvas.height, "#FFF");
        drawText( playersData+ ' was disconnected', '20pt Calibri', canvas.width/2, canvas.height/4, 'red');
        stopGame();
       // resetConnection();
    });

    socket.on('disconnect', function () {
        stopGame();
        resetConnection();
    });

    socket.on('printWin', function (nick) {
            var text = 'Bravo' + nick+ ' you are winner';
            console.log('------------------printWin--------------------------> ' + text);
            drawText(text, '20pt Calibri',canvas.width/2, canvas.height/2, "#000");
            socket.emit('nextLevel');
    });

     socket.on('waitOfLoser', function (wins) {
        drawText('Well done! waiting for your adversary....', '14pt Calibri', canvas.width/2, canvas.height/2, "#000");
        console.log('--------------waitOfLoser----------------------->'+wins);
    });
}

function resetConnection(){
    gameStarted = false;
    socket = io.connect()
    startGameSession();
}

function requestAllDataPlayers(){
    socket.emit('requestplayersdata');
}

function sendMyData(data){
    data.nickname = myNick;
    data.id = socket.id;
    socket.emit('updatemydata', data);
}

function waitOtherPlayers(){
    drawText("waiting for other player...", "20px sans-serif", canvas.width/2, canvas.height/2, "#000");
}

function winPrint(text){
    drawText(text, "20px sans-serif", 0, canvas.height/2, "#000");
}

function onLevelPassed(){
    // console.log('--------------onLevel ' + levelIndex + ' Passed----------------------->');
    console.log('--------------onLevel  Passed----------------------->');
    gameStarted = false;
    stopGame();

    if(levelIndex >= levels.length){
           drawRect(0, 0, canvas.width, canvas.height, "#FFF");
       }else{
        levelIndex++;
        socket.emit("levelpassed");
    }
}
