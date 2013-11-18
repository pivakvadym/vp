function Hero(x, y, size, speed, color){
	this.x = x;
	this.y = y;
	this.size = size || 30;
	this.speed = speed || 5;
	this.color = color || "#B00";
	this.effects = [];
	
	this.direction = {
		up: false,
		down: false,
		left: false,
		right: false
	};
	
	this.step = function(){
		var stepX = 0;
		var stepY = 0;
		if(this.direction.up) stepY -= this.speed;
		if(this.direction.down) stepY += this.speed;
		if(this.direction.left) stepX -= this.speed;
		if(this.direction.right) stepX += this.speed;
	
		if(stepX && stepY){
			stepX /= Math.sqrt(2);
			stepY /= Math.sqrt(2);
		}
		this.x += stepX;
		this.y += stepY;

		if(this.x < 0){
			this.x = 0;
		}else if(this.x + this.size > level.scene.width){
			this.x = level.scene.width - this.size;
		}
		if(this.y < 0){
			this.y = 0;
		}else if(this.y + this.size > level.scene.height){
			this.y = level.scene.height - this.size;
		}

		this.effects.forEach(function(effect){
			effect.update();
		});
	};
}