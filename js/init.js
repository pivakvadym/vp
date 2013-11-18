// generic way to set animation up
window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			window.setTimeout(callback, 1000 / 60);
		};
})();

var canvas = null;
var context = null;

function onCompleteCounter(){
	if(levelIndex >= levels.length){
	    levelIndex = 0;
	}
	startGame(levels[levelIndex]);
}

function onLoad(event){
	mainLoop();
    gamename_header();
    canvas = document.getElementById("game");
	context = canvas.getContext("2d");
	canvas.width = 400;
	canvas.height = 400;
	startGameSession();
	window.removeEventListener("load", onLoad);
}
window.addEventListener("load", onLoad);