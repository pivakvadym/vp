function drawCircle(x, y, r, color){
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI);
	context.fillStyle = color;
	context.fill();
}

function drawSquare(x, y, size, color){
	context.beginPath();
	context.fillStyle = color;
	context.fillRect(x, y, size, size);
}

function drawRect(x, y, width, height, color){
	context.beginPath();
	context.fillStyle = color;
	context.fillRect(x, y, width, height);
}
	
function drawText(text, style, x, y, color){
	context.beginPath();
	context.font = style;
	context.fillStyle = color;
    context.textAlign = 'center';
    context.fillText(text, x, y);
}

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function gamename_header (){
    var canvas2= document.getElementById("head");
    var context2 = canvas2.getContext("2d");
    canvas2.width = 660;
    canvas2.height = 60;
    context2.font = '24pt georgia';
    context2.lineWidth = 3;
    context2.fillStyle = get_random_color();
    context2.fillText("Mini game JavaScript : Crazy Koubiks",0,canvas2.height/2);
    context2.textAlign = 'center';
}

