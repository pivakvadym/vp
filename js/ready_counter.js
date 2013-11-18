var counterStrings = ["3", "2", "1", "start!"];
var counterStringIndex = 0;

function startLoop(){
	console.log("-----------------counterStringIndex-->"+counterStringIndex);
	if(counterStringIndex >= counterStrings.length){
		counterStringIndex = 0;
		onCompleteCounter();
	}else{
		drawRect(0, 0, canvas.width, canvas.height, "#FFF");
		drawText(counterStrings[counterStringIndex], "20px arial", canvas.width/2, canvas.height/2, "#000");
		counterStringIndex++;
		setTimeout(startLoop, 1000);
	}
}
function waitReady(){
	counterStringIndex = 0;
	startLoop();
}

function waitReady(p){
	counterStringIndex = 0;
	startLoop(p);
	//drawRect(0, 0, canvas.width, canvas.height, "#FFF");
	//drawText(counterStrings[0], "20px arial", 20, 20, "#000");
}

function startLoop(p){
	console.log(counterStringIndex);
	if(counterStringIndex >= counterStrings.length){
		counterStringIndex = 0;
		onCompleteCounter();
	}else{

		drawRect(0, 0, canvas.width, canvas.height, "#FFF");
		if(typeof p != 'undefined') {
			drawText(counterStrings[counterStringIndex] + ' ' + p, "20px arial", canvas.width/2, canvas.height/2, "#000");
		} else {
			drawText(counterStrings[counterStringIndex], "20px arial", canvas.width/2, canvas.height/2, "#000");
		}
		counterStringIndex++;

		if (counterStringIndex == 0) {
			setTimeout(startLoop, 3000);
		} else {
			setTimeout(startLoop, 1000);
		}
	}
}


