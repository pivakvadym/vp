var level = null;
var hero = null;
var target = null;
var enemies = null;

function step(){
	hero.step();

	if(squareCollide(hero, level.target)){
		onLevelPassed();
	}

	enemies.forEach(function(enemy){
		enemy.step();

		if(squareRectCollide(hero, enemy)){
			enemy.collisionEffect(hero);
		}
	});
}


function draw(){
	context.beginPath();
	context.fillStyle = "#FFF";
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	var alignX = canvas.width / 3 - hero.size / 2;
	var alignY = canvas.height / 2 - hero.size / 2;
	//var scaleX = canvas.width / level.scene.width;
	//var scaleY = level.scene.height / canvas.height;
	var offsetX = 0;
	var offsetY = 0;
	
	if(level.scene.width < canvas.width){
		offsetX = (level.scene.width / 2 - canvas.width / 2);
	}else if(hero.x < alignX){
		offsetX = 0;
	}else if(hero.x > level.scene.width - (canvas.width - alignX)){
		offsetX = level.scene.width - canvas.width;
	}else{
		offsetX = hero.x - alignX;
	}

	if(level.scene.height < canvas.height){
		offsetY = (level.scene.height / 2 - canvas.height / 2);
	}else if(hero.y < alignY){
		offsetY = 0;
	}else if(hero.y > level.scene.height - (canvas.height - alignY)){
		offsetY = level.scene.height - canvas.height;
	}else{
		offsetY = hero.y - alignY;
	}

	{ // draw border
		drawRect(
			-1 - offsetX,
			-1 - offsetY,
			level.scene.width + 2,
			level.scene.height + 2,
			"#000"
		);
		drawRect(
			0 - offsetX,
			0 - offsetY,
			level.scene.width,
			level.scene.height,
			"#FFF"
		);
	}

	drawSquare(target.x - offsetX, target.y - offsetY, target.size, target.color);

	enemies.forEach(function(enemy){
		drawRect(enemy.x - offsetX, enemy.y - offsetY, enemy.width, enemy.height, enemy.color);
	});

	playersData.players.forEach(function(player){
		drawRect(player.x - offsetX, player.y - offsetY, player.width, player.height, player.color);
	})
	//drawRect(hero.x - offsetX, hero.y - offsetY, hero.size, hero.size, hero.color);
}

var mainLoopIsInactive = true;


function mainLoop(){
	if(!mainLoopIsInactive){
		step();
	}
	if(!mainLoopIsInactive){
		draw();
		requestAllDataPlayers();

		sendMyData({
			x: hero.x,
			y: hero.y,
			width: hero.size,
			height: hero.size,
			color: hero.color
		});
	}
	requestAnimationFrame(mainLoop);
}

function stopMainLoop(){
	mainLoopIsInactive = true;
	
	window.removeEventListener("keydown", onMouseEvent);
	window.removeEventListener("keyup", onMouseEvent);
}

function startGame(configLevel){
	level = constructLevel(configLevel);
	hero = level.hero;
	target = level.target;
	enemies = level.enemys;

	window.addEventListener("keydown", onMouseEvent);
	window.addEventListener("keyup", onMouseEvent);
	mainLoopIsInactive = false;
}

function stopGame(){
	stopMainLoop();
}

function onMouseEvent(event){
	var flag = false;
	switch(event.type){
		case "keydown": flag = true;
			break;
		case "keyup": break;
	}

	switch(event.keyCode){
		case 38: hero.direction.up = flag; break;
		case 40: hero.direction.down = flag; break;
		case 37: hero.direction.left = flag; break;
		case 39: hero.direction.right = flag; break;
	}
}

function constructLevel(configLevel){
	var resultLevel = {};
	resultLevel.hero = new Hero(
		configLevel.hero.x,
		configLevel.hero.y,
		configLevel.hero.size,
		configLevel.hero.speed,
		configLevel.hero.color
	);

	resultLevel.enemys = [];
	configLevel.enemys.forEach(function(configEnemy){
		resultLevel.enemys.push(new Enemy(
			configEnemy.x,
			configEnemy.y,
			configEnemy.type,
			configEnemy.subtype
		));
	});

	resultLevel.target = {
		x: configLevel.target.x,
		y: configLevel.target.y,
		size: configLevel.target.size,
		color: configLevel.target.color
	};

	resultLevel.scene = {
		width: configLevel.scene.width,
		height: configLevel.scene.height
	}

	return resultLevel;
}